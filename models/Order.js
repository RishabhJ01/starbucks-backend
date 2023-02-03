const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    orderData: {
        type: Date,
        required: true,
    },
    items: [{
        itemId: mongoose.Schema.Types.ObjectId,
        item_name: String,
        item_count: Number,
        description: String,
        price: Number,
    }],
    totalCost: {
        type: Number,
        required: true,
    },

}, {timestamps: true},
{collections: 'Order'});

module.exports = mongoose.model("Order", OrderSchema);