import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, ListGroup, Card } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '', tags: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/community/posts');
                setPosts(response.data);
            } catch (err) {
                setError('Failed to fetch posts');
            }
        };
        fetchPosts();

        socket.on('newPost', (post) => {
            setPosts((prevPosts) => [post, ...prevPosts]);
        });

        return () => {
            socket.off('newPost');
        };
    }, []);

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/community/posts', { ...newPost, tags: newPost.tags.split(',') });
            setNewPost({ title: '', content: '', tags: '' });
            socket.emit('newPost', response.data);
        } catch (err) {
            setError('Failed to create post');
        }
    };

    const handleUpvote = async (postId) => {
        try {
            await axios.post(`/api/community/posts/${postId}/upvote`);
            const response = await axios.get('/api/community/posts');
            setPosts(response.data);
        } catch (err) {
            setError('Failed to upvote post');
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Community</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handlePostSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <ReactQuill
                        value={newPost.content}
                        onChange={(content) => setNewPost({ ...newPost, content })}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Tags (comma separated)</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter tags"
                        value={newPost.tags}
                        onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Post
                </Button>
            </Form>
            <ListGroup className="mt-4">
                {posts.map(post => (
                    <ListGroup.Item key={post._id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text dangerouslySetInnerHTML={{ __html: post.content }} />
                                <Card.Text>Tags: {post.tags.join(', ')}</Card.Text>
                                <Card.Text>By: {post.userId.username}</Card.Text>
                                <Card.Text>Upvotes: {post.upvotes}</Card.Text>
                                <Button variant="success" onClick={() => handleUpvote(post._id)}>Upvote</Button>
                                <Comments postId={post._id} />
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            const response = await axios.get(`/api/community/posts/${postId}/comments`);
            setComments(response.data);
        };
        fetchComments();
    }, [postId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`/api/community/posts/${postId}/comments`, { content: newComment });
        setNewComment('');
        const response = await axios.get(`/api/community/posts/${postId}/comments`);
        setComments(response.data);
    };

    return (
        <div className="mt-3">
            <Form onSubmit={handleCommentSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Add a comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Comment
                </Button>
            </Form>
            <ListGroup className="mt-3">
                {comments.map(comment => (
                    <ListGroup.Item key={comment._id}>{comment.content}</ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default Community;