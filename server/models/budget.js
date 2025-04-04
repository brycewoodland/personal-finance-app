const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    allocated: { type: Number, required: true },
    spent: { type: Number, required: true },
    remaining: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    customId: { type: Number, unique: true }, // Custom ID can still be generated on the frontend
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Budget = mongoose.model('Budget', budgetSchema);

module.exports = Budget;
