const express = require('express');

const router = express.Router();

// GET all orders
router.get('/', (req, res) => {
    res.json({ message: 'Get all orders' });
});

// GET order by ID
router.get('/:id', (req, res) => {
    res.json({ message: `Get order ${req.params.id}` });
});

// POST create new order
router.post('/', (req, res) => {
    res.json({ message: 'Create new order' });
});

// PUT update order
router.put('/:id', (req, res) => {
    res.json({ message: `Update order ${req.params.id}` });
});

// DELETE order
router.delete('/:id', (req, res) => {
    res.json({ message: `Delete order ${req.params.id}` });
});

module.exports = router;