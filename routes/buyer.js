const express = require('express');
const router = express.Router();

const Shop = require('../models/Shop');
const Product = require('../models/Product');
const Order = require('../models/Order');

//  Browse shops
router.get('/shops', async (req, res) => {
  try {
    const shops = await Shop.find({ status: 'approved' });
    res.json(shops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Browse products by shop
router.get('/shops/:id/products', async (req, res) => {
  try {
    const products = await Product.find({ shop: req.params.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Place order
router.post('/orders', async (req, res) => {
  try {
    const { buyerId, products, deliveryMethod } = req.body;

    const totalPrice = products.reduce(
      (acc, p) => acc + p.price * p.quantity,
      0
    );

    const order = new Order({
      buyer: buyerId,
      products,
      totalPrice,
      deliveryMethod
    });

    await order.save();
    res.json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Order history
router.get('/orders/:buyerId', async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.params.buyerId })
      .populate('products.product')
      .populate('buyer');

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;