const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Add a review
router.post('/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { userId, rating, comment } = req.body;
    const product = await Product.findById(productId);
    product.reviews.push({ userId, rating, comment });
    await product.save();
    res.status(201).send('Review added');
});

// Create a product
router.post('/', async (req, res) => {
    const { name, description, price, category, type, material } = req.body;
    const product = new Product({ name, description, price, category, type, material });
    await product.save();
    res.status(201).send('Product created');
});

// Get all products
router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Get products by category
router.get('/category/:category', async (req, res) => {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.json(products);
});

// Get a product by ID
router.get('/:productId', async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    res.json(product);
});

// Get products by type
router.get('/type/:type', async (req, res) => {
    const { type } = req.params;
    const products = await Product.find({ type });
    res.json(products);
});

module.exports = router;