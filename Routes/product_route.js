const express = require('express');
const Product = require('../Models/product_models');
const protect = require('../middleware/auth_middleware');
const authorize = require('../middleware/authorize_middleware');
const router = express.Router();

// Create a new product
router.post('/', protect, authorize(['admin']), async (req, res) => {
    try {
        const { name, description, price, stock_quantity, category } = req.body;
        const newProduct = new Product({ name, description, price, stock_quantity, category });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all products with pagination and filtering
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, category, price_min, price_max, search } = req.query;

        const filter = {};
        if (category) filter.category = category;
        if (price_min) filter.price = { ...filter.price, $gte: price_min };
        if (price_max) filter.price = { ...filter.price, $lte: price_max };
        if (search) filter.$text = { $search: search };

        const products = await Product.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Product.countDocuments(filter);

        res.status(200).json({
            products,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a product by ID
router.put('/:id', protect, authorize(['admin']), async (req, res) => {
    try {
        const { name, description, price, stock_quantity, category } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, stock_quantity, category },
            { new: true, runValidators: true }
        );
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a product by ID
router.delete('/:id', protect, authorize(['admin']), async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
