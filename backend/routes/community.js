const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Create a post with tags
router.post('/posts', async (req, res) => {
    const { userId, title, content, tags } = req.body;
    const post = new Post({ userId, title, content, tags });
    await post.save();
    res.status(201).send('Post created');
});

// Get all posts
router.get('/posts', async (req, res) => {
    const posts = await Post.find().populate('userId', 'username');
    res.json(posts);
});

// Add a comment to a post
router.post('/posts/:postId/comments', async (req, res) => {
    const { postId } = req.params;
    const { userId, content } = req.body;
    const post = await Post.findById(postId);
    post.comments.push({ userId, content });
    await post.save();
    res.status(201).send('Comment added');
});

// Add an upvote to a post
router.post('/posts/:postId/upvote', async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    post.upvotes += 1;
    await post.save();
    res.status(200).send('Post upvoted');
});

module.exports = router;