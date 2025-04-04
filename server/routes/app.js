const express = require('express');
const router = express.Router();
const budgetRoutes = require('./budget');
const categoryRoutes = require('./category');
const transactionRoutes = require('./transaction');
const userRoutes = require('./user');

router.use('/budgets', budgetRoutes);
router.use('/categories', categoryRoutes);
router.use('/transactions', transactionRoutes);
router.use('/users', userRoutes);

module.exports = router;
