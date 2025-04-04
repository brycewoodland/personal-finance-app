const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
    maxUserId: { type: Number },
    maxCategoryId: { type: Number },
    maxBudgetId: { type: Number }
});

module.exports = mongoose.model('Sequence', sequenceSchema); 