const express = require('express');
const Menu = require('../models/Menu');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();



// GET /menu: Fetch all menu items
router.get('/menu', async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.status(200).json(menuItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch menu items.' });
    }
});

// POST /menu: Add a new menu item
router.post('/menu', fetchuser, async (req, res) => {
    try {
        const { name, category, price, availability } = req.body;

        if (!name || !price) {
            return res.status(400).json({ error: 'Name and price are required.' });
        }

        const newMenuItem = new Menu({ name, category, price, availability });
        await newMenuItem.save();

        res.status(201).json({ message: 'Menu item added successfully.', item: newMenuItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add menu item.' });
    }
});

// PUT /menu/:id: Update a menu item
router.put('/menu/:id', fetchuser, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, price, availability } = req.body;

        if (!name || !price) {
            return res.status(400).json({ error: 'Name and price are required.' });
        }

        const updatedData = { name, category, price, availability };

        const menuItem = await Menu.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true
        });

        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found.' });
        }

        res.status(200).json({ message: 'Menu item updated successfully.', item: menuItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update menu item.' });
    }
});

// DELETE /menu/:id: Delete a menu item
router.delete('/menu/:id', fetchuser, async (req, res) => {
    try {
        const { id } = req.params;

        const menuItem = await Menu.findByIdAndDelete(id);

        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found.' });
        }

        res.status(200).json({ message: 'Menu item deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete menu item.' });
    }
});

// POST /menu/add-20-items: Automatically add 20 items to the menu with realistic Indian prices
router.post('/menu/add-20-items', async (req, res) => {
    try {
        const sampleMenuItems = [
            { name: 'Spring Rolls', category: 'Appetizers', price: 159 },
            { name: 'Stuffed Mushrooms', category: 'Appetizers', price: 219 },
            { name: 'Chicken Tikka', category: 'Appetizers', price: 299 },
            { name: 'Fish Fingers', category: 'Appetizers', price: 249 },
            { name: 'Paneer Tikka', category: 'Appetizers', price: 279 },
            { name: 'Cheese Corn Balls', category: 'Appetizers', price: 199 },
            { name: 'Crispy Veg', category: 'Appetizers', price: 179 },
            { name: 'Hara Bhara Kebab', category: 'Appetizers', price: 189 },
            { name: 'Tandoori Prawns', category: 'Appetizers', price: 349 },
            { name: 'Mutton Seekh Kebab', category: 'Appetizers', price: 329 },

            { name: 'Mutton Rogan Josh', category: 'Main Course', price: 399 },
            { name: 'Palak Paneer', category: 'Main Course', price: 299 },
            { name: 'Vegetable Jalfrezi', category: 'Main Course', price: 249 },
            { name: 'Shahi Paneer', category: 'Main Course', price: 319 },
            { name: 'Chicken Curry', category: 'Main Course', price: 349 },
            { name: 'Fish Curry', category: 'Main Course', price: 299 },
            { name: 'Egg Curry', category: 'Main Course', price: 249 },
            { name: 'Dal Makhani', category: 'Main Course', price: 229 },
            { name: 'Bhindi Masala', category: 'Main Course', price: 199 },
            { name: 'Kashmiri Pulao', category: 'Main Course', price: 249 },

            { name: 'Phirni', category: 'Desserts', price: 149 },
            { name: 'Kheer', category: 'Desserts', price: 129 },
            { name: 'Jalebi', category: 'Desserts', price: 99 },
            { name: 'Kulfi', category: 'Desserts', price: 129 },
            { name: 'Motichoor Ladoo', category: 'Desserts', price: 79 },
            { name: 'Badam Halwa', category: 'Desserts', price: 149 },
            { name: 'Pineapple Pastry', category: 'Desserts', price: 99 },
            { name: 'Chocolate Brownie', category: 'Desserts', price: 179 },
            { name: 'Rasmalai', category: 'Desserts', price: 129 },
            { name: 'Carrot Halwa', category: 'Desserts', price: 149 }
        ];

        const result = await Menu.insertMany(sampleMenuItems);

        res.status(201).json({
            message: '20 menu items have been added successfully with realistic prices in Indian Rupees.',
            items: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add menu items.' });
    }
});


module.exports = router;
