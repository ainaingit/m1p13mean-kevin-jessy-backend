const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }],
  totalPrice: Number,
  status: { type: String, enum: ['pending','in_progress','delivered'], default: 'pending' },
  deliveryMethod: { type: String, enum: ['pickup','delivery'], default: 'pickup' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);