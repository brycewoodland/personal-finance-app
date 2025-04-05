const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id: { type: String, required: true }, // ID will be generated on the frontend
    name: { type: String, required: true },
    icon: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    budgetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Budget' }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
