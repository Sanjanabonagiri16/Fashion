const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const measurementSchema = new Schema({
    shoulder: Number,
    frontLength: Number,
    backLength: Number,
    chest: Number,
    upperChest: Number,
    waistFitting: Number,
    armhole: Number,
    kamarFitting: Number,
    hip: Number,
    handLength: Number,
    handFitting: Number,
    frontNeck: Number,
    backNeck: Number,
    pantLength: Number,
    pantFitting: Number,
    pantBeltFitting: Number,
    pantHipFitting: Number,
    pantBottomFitting: Number
});

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number
        }
    ],
    totalAmount: Number,
    measurements: measurementSchema,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);