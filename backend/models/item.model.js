const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        trim: true,
    },
    itemCategory: {
        type: String,
        required: true,
        trim: true,
    },
    itemQty: {
        type: Number,
        required: true,
        trim: true,
    },
    itemDescription: {
        type: String,
        required: true,
        trim: true,
    },
    //'user' field to the item schema, which is of type ObjectId referencing the User model.
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

const itemModel = mongoose.model('items', itemSchema);
module.exports = itemModel;