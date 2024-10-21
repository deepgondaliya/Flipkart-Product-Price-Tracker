const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    currentPrice: Number,
    priceHistory: [{ price: Number, date: { type: Date, default: Date.now } }],
    reviews: Number,
    totalPurchases: Number,
    link: String,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
