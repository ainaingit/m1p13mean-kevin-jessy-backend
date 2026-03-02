const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin','shop','buyer'], default: 'buyer' },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }
});

module.exports = mongoose.model('User', userSchema);