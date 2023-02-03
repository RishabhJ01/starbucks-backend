const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        required: true,
    },
},
{timestamps: true},
{collection: 'Item'});

module.exports = mongoose.model('Item', ItemSchema);