const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');

const User = require('../models/User');
const Shop = require('../models/Shop');
const Order = require('../models/Order');

// getUsersByRole function in controllers adminController.js
const { getUsersByRole } = require('../controllers/adminController');

// Dashboard stats
router.get('/dashboard', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  try {
    const users = await User.countDocuments();
    const shops = await Shop.countDocuments();
    const orders = await Order.countDocuments();
    res.json({ users, shops, orders });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// List users
router.get('/users', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// List shops
router.get('/shops', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  const shops = await Shop.find();
  res.json(shops);
});

// Validate shop
router.put('/shops/:id/validate', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  const { status } = req.body; // approved / blocked
  const shop = await Shop.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(shop);
});

//  List all orders
router.get('/orders', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  const orders = await Order.find().populate('buyer').populate('products.product');
  res.json(orders);
});


router.get('/users/role/:role', authMiddleware, roleMiddleware('admin'), getUsersByRole);

module.exports = router;