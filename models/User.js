const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    username: {
        type: String,
        required: true,
        min: 3,
        unique: true
    }, 
    password: {
        type: String,
        required: true,
        min: 5,
    },
    first_name: {
        type: String,
        required: true
    }
    ,last_name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        min: 5
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    orders: {
        type: Array,
        default: []
    }
},
{timestamps: true},
{collection: 'User'});

module.exports = mongoose.model('User', UserSchema);