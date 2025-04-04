const express = require('express');
const router = express.Router();
const Budget = require('../models/budget');

// Create a new budget
router.post('/', async (req, res) => {
    const { category, allocated, spent, remaining, userId } = req.body;

    const budget = new Budget({
        category,
        allocated,
        spent,
        remaining,
        userId,
        customId: req.body.customId // Assuming customId is generated on the frontend
    });

    try {
        const savedBudget = await budget.save();
        res.status(201).json(savedBudget);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all budgets
router.get('/', async (req, res) => {
    try {
        const budgets = await Budget.find();
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific budget by ID
router.get('/:id', async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        if (!budget) return res.status(404).json({ message: 'Budget not found' });
        res.status(200).json(budget);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a budget
router.put('/:id', async (req, res) => {
    try {
        const updatedBudget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBudget) return res.status(404).json({ message: 'Budget not found' });
        res.status(200).json(updatedBudget);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a budget
router.delete('/:id', async (req, res) => {
    try {
        const deletedBudget = await Budget.findByIdAndDelete(req.params.id);
        if (!deletedBudget) return res.status(404).json({ message: 'Budget not found' });
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
