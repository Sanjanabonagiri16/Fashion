import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';

const Profile = () => {
    const [profile, setProfile] = useState({ username: '', email: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/users/your_user_id');
                setProfile(response.data);
            } catch (err) {
                setError('Failed to fetch profile');
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/api/users/your_user_id', profile);
            setSuccess('Profile updated successfully');
        } catch (err) {
            setError('Failed to update profile');
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Card className="p-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={profile.username}
                            onChange={handleChange}
                            className="form-control-lg"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            className="form-control-lg"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="btn-lg btn-block">
                        Update Profile
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Profile;