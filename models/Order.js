const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number
    }
  ],
  totalPrice: Number,
  status: { 
    type: String, 
    enum: ['pending','processing','delivered'], 
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);