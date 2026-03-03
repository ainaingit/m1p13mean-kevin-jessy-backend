const express = require('express');
const router = express.Router();

const Shop = require('../models/Shop');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Create shop
router.post('/', async (req, res) => {
  try {
    const { owner } = req.body; //  maintenant on le prend du body

    const existingShop = await Shop.findOne({ owner });
    if (existingShop) {
      return res.status(400).json({ message: "Shop déjà existant" });
    }

    const newShop = new Shop({
      ...req.body,
      owner,
      status: 'pending'
    });

    await newShop.save();
    res.status(201).json(newShop);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update shop profile
router.put('/profile/:ownerId', async (req, res) => {
  try {
    const shop = await Shop.findOneAndUpdate(
      { owner: req.params.ownerId },
      req.body,
      { new: true }
    );

    res.json(shop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create product
router.post('/products/:ownerId', async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.params.ownerId });

    if (!shop) return res.status(404).json({ message: "Shop non trouvé" });

    const product = new Product({ ...req.body, shop: shop._id });
    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get products
router.get('/products/:ownerId', async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.params.ownerId });

    if (!shop) return res.status(404).json({ message: "Shop non trouvé" });

    const products = await Product.find({ shop: shop._id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Produit supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Orders for shop
router.get('/orders/:ownerId', async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.params.ownerId });

    if (!shop) return res.status(404).json({ message: "Shop non trouvé" });

    const productIds = await Product.find({ shop: shop._id }).distinct('_id');

    const orders = await Order.find({
      'products.product': { $in: productIds }
    })
      .populate('buyer')
      .populate('products.product');

    res.json(orders);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    res.json(shop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;