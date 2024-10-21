const express = require('express');
const axios = require('axios');
const Product = require('../models/Product');

const router = express.Router();

const fetchProductDetails = async (url) => {
    return {
        title: 'Sample Product',
        description: 'This is a sample product description.',
        currentPrice: 1000,
        reviews: 50,
        totalPurchases: 200,
        link: url,
    };
};

router.post('/fetch', async (req, res) => {
    const { link } = req.body;

    try {
        const productDetails = await fetchProductDetails(link);
        const newProduct = new Product({ ...productDetails, priceHistory: [{ price: productDetails.currentPrice }] });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product details' });
    }
});

router.post('/recheck', async (req, res) => {
    const { id } = req.body;

    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        const newPrice = product.currentPrice;
        product.priceHistory.push({ price: newPrice });
        product.currentPrice = newPrice;
        await product.save();

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to recheck price' });
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

module.exports = router;
