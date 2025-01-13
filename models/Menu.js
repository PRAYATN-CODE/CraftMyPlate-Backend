const mongoose = require('mongoose');

// Define the schema for the menu
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['Appetizers', 'Main Course', 'Desserts'],
        default: 'Main Course'
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    availability: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
