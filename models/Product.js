const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }
});

module.exports = mongoose.model('Product', productSchema);