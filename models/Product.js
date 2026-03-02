const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  category: String,
  images: [String],
  shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }
});

module.exports = mongoose.model('Product', productSchema);