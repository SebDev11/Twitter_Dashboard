const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
        trim: true,
    },
    itemImage: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {timestamps: true})

const itemModel = mongoose.model('items', itemSchema);
module.exports = itemModel;