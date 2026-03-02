const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  logo: String,
  status: { type: String, enum: ['pending','approved','blocked'], default: 'pending' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Shop', shopSchema);