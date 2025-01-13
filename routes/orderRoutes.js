const express = require('express');
const Menu = require('../models/Menu');
const router = express.Router();
const Order = require('../models/Order')


// POST /order: Place an order
router.post('/order', async (req, res) => {
    try {
        const { items } = req.body;
        const { id: userId } = req.user;


        if (!userId || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Invalid order details provided.' });
        }

        let totalAmount = 0;
        for (const item of items) {
            const menuItem = await Menu.findById(item.menuItemId);
            if (!menuItem) {
                return res.status(404).json({ error: `Menu item with ID ${item.menuItemId} not found.` });
            }
            totalAmount += menuItem.price * item.quantity;
        }

        const newOrder = new Order({
            userId,
            items,
            totalAmount,
            status: 'Pending',
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({
            message: 'Order placed successfully!',
            order: savedOrder,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to place the order.' });
    }
});


// GET /orders: Fetch all orders of a logged-in user
router.get('/orders', async (req, res) => {
    try {

        const { id: userId } = req.user;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required to fetch orders.' });
        }

        const userOrders = await Order.find({ userId }).populate('items.menuItemId');

        res.status(200).json({
            message: 'Orders fetched successfully.',
            orders: userOrders,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch orders.' });
    }
});

module.exports = router;
