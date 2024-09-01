const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Register
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email });
    await user.save();

    // Send verification email
    const transporter = nodemailer.createTransport({ /* SMTP config */ });
    const mailOptions = {
        from: 'your_email@example.com',
        to: email,
        subject: 'Email Verification',
        text: 'Please verify your email by clicking the following link: ...'
    };
    transporter.sendMail(mailOptions);

    res.status(201).send('User registered. Please check your email for verification.');
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

module.exports = router;