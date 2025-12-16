const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    avatar: {
        type: String,
        default: ''
    },
    accountType: {
        type: String,
        enum: ['employee', 'company'],
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    role: {
        type: String,
        enum: ['admin', 'developer', 'maintainer'],
        default: 'developer'
    },
    subscriptions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
