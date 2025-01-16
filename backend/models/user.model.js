const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: true,
        unique: true 
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        unique: true,
    },
    job: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
}, {timestamps: true});

const userModel = mongoose.model('User', UserSchema);
module.exports = userModel;