import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const Auth = () => {
    const [form, setForm] = useState({ username: '', password: '', email: '' });
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? '/api/auth/login' : '/api/auth/register';
        try {
            const response = await axios.post(url, form);
            console.log(response.data);
        } catch (err) {
            setError('Failed to authenticate');
        }
    };

    return (
        <Container className="auth-container mt-5">
            <h2 className="mb-4">{isLogin ? 'Login' : 'Register'}</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        value={form.username}
                        onChange={handleChange}
                        className="form-control-lg"
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={form.password}
                        onChange={handleChange}
                        className="form-control-lg"
                    />
                </Form.Group>
                {!isLogin && (
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={form.email}
                            onChange={handleChange}
                            className="form-control-lg"
                        />
                    </Form.Group>
                )}
                <Button variant="primary" type="submit" className="btn-lg btn-block">
                    {isLogin ? 'Login' : 'Register'}
                </Button>
            </Form>
            <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="mt-3">
                {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </Button>
        </Container>
    );
};

export default Auth;