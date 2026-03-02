const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');

const Shop = require('../models/Shop');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Browse shops
router.get('/shops', authMiddleware, roleMiddleware('buyer'), async (req,res)=>{
  const shops = await Shop.find({ status:'approved' });
  res.json(shops);
});

// Browse products by shop
router.get('/shops/:id/products', authMiddleware, roleMiddleware('buyer'), async (req,res)=>{
  const products = await Product.find({ shop:req.params.id });
  res.json(products);
});

// Place order
router.post('/orders', authMiddleware, roleMiddleware('buyer'), async (req,res)=>{
  const { products, deliveryMethod } = req.body;
  const totalPrice = products.reduce((acc,p) => acc + p.price*p.quantity,0);
  const order = new Order({ buyer:req.user.id, products, totalPrice, deliveryMethod });
  await order.save();
  res.json(order);
});

// Order history
router.get('/orders', authMiddleware, roleMiddleware('buyer'), async (req,res)=>{
  const orders = await Order.find({ buyer:req.user.id }).populate('products.product').populate('buyer');
  res.json(orders);
});

module.exports = router;