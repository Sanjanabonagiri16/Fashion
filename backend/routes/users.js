const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user profile
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.json(user);
});

// Update user profile
router.put('/:userId', async (req, res) => {
    const { userId } = req.params;
    const { username, email } = req.body;
    await User.findByIdAndUpdate(userId, { username, email });
    res.status(200).send('User profile updated');
});

module.exports = router;