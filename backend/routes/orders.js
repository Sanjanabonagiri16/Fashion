const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create an order
router.post('/', async (req, res) => {
    const { userId, products, totalAmount } = req.body;
    const order = new Order({ userId, products, totalAmount });
    await order.save();
    res.status(201).send('Order created');
});

// Get orders by user ID
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    const orders = await Order.find({ userId }).populate('products.productId');
    res.json(orders);
});

module.exports = router;