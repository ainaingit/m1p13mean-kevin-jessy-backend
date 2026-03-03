const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');

const Shop = require('../models/Shop');
const Product = require('../models/Product');
const Order = require('../models/Order');

//  Create shop
router.post('/', authMiddleware, roleMiddleware('shop'), async (req, res) => {
  try {
    // Vérifier si le shop existe déjà
    const existingShop = await Shop.findOne({ owner: req.user.id });
    if (existingShop) {
      return res.status(400).json({ message: "Shop déjà existant" });
    }

    const newShop = new Shop({
      ...req.body,
      owner: req.user.id,
      status: 'pending' // important pour validation admin
    });

    await newShop.save();

    res.status(201).json(newShop);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Profile shop
router.put('/profile', authMiddleware, roleMiddleware('shop'), async (req, res) => {
  const shop = await Shop.findOneAndUpdate({ owner: req.user.id }, req.body, { new: true });
  res.json(shop);
});

// CRUD products
router.post('/products', authMiddleware, roleMiddleware('shop'), async (req, res) => {
  const shop = await Shop.findOne({ owner: req.user.id });
  const product = new Product({ ...req.body, shop: shop._id });
  await product.save();
  res.json(product);
});

router.get('/products', authMiddleware, roleMiddleware('shop'), async (req, res) => {
  const shop = await Shop.findOne({ owner: req.user.id });
  const products = await Product.find({ shop: shop._id });
  res.json(products);
});

router.put('/products/:id', authMiddleware, roleMiddleware('shop'), async (req,res)=>{
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new:true });
  res.json(product);
});

router.delete('/products/:id', authMiddleware, roleMiddleware('shop'), async (req,res)=>{
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Produit supprimé' });
});

//  Orders for shop
router.get('/orders', authMiddleware, roleMiddleware('shop'), async (req,res)=>{
  const shop = await Shop.findOne({ owner: req.user.id });
  const orders = await Order.find({ 'products.product': { $in: await Product.find({shop: shop._id}).distinct('_id') } }).populate('buyer').populate('products.product');
  res.json(orders);
});

module.exports = router;