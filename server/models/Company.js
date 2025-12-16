const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    companyEmail: { // Contact/Admin email
        type: String,
        required: true,
        unique: true
    },
    companyCode: {
        type: String,
        required: true,
        unique: true
    },
    domain: {
        type: String
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
