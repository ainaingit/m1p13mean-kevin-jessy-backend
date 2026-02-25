const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: String,
  description: String,
  logo: String,
  approved: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Shop', shopSchema);