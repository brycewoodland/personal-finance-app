const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// Create a new transaction
router.post('/', async (req, res) => {
    const { amount, date, description, categoryId, budgetId, userId } = req.body;

    const transaction = new Transaction({
        amount,
        date,
        description,
        categoryId,
        budgetId,
        userId,
        customId: req.body.customId // Assuming customId is generated on the frontend
    }); 

    try {   
        const savedTransaction = await transaction.save();
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('categoryId');
        res.status(200).json(transactions);
    } catch (error) { 
        res.status(500).json({ message: error.message });
    }
});

// Get a specific transaction by ID
router.get('/:id', async (req, res) => {    
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a transaction
router.put('/:id', async (req, res) => { 
    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTransaction) return res.status(404).json({ message: 'Transaction not found' });
        res.status(200).json(updatedTransaction);
    } catch (error) { 
        res.status(400).json({ message: error.message });
    }
});

// Delete a transaction
router.delete('/:id', async (req, res) => {   
    try {
        const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!deletedTransaction) return res.status(404).json({ message: 'Transaction not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;


