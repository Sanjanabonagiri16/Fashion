const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    type: String, // New field for type of dressing or embroidery work
    material: String, // New field for cloth material
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);