const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' } || null,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    customId: { type: Number, unique: true }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
