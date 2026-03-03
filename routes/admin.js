const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Shop = require('../models/Shop');
const Order = require('../models/Order');

// getUsersByRole function in controllers adminController.js
const { getUsersByRole } = require('../controllers/adminController');

// 🔹 Dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const users = await User.countDocuments();
    const shops = await Shop.countDocuments();
    const orders = await Order.countDocuments();
    res.json({ users, shops, orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 List users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 List shops
router.get('/shops', async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Validate shop
router.put('/shops/:id/validate', async (req, res) => {
  try {
    const { status } = req.body; // approved / blocked
    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(shop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 List all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('buyer')
      .populate('products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Users by role
router.get('/users/role/:role', getUsersByRole);

module.exports = router;