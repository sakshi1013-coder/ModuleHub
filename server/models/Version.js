const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
    component: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Component',
        required: true
    },
    versionNumber: { // e.g., '1.0.0'
        type: String,
        required: true
    },
    changelog: {
        type: String
    },
    codeSnippet: { // For storing code directly or a link to CDN
        type: String
    }
}, {
    timestamps: true
});

// Ensure unique version per component
versionSchema.index({ component: 1, versionNumber: 1 }, { unique: true });

module.exports = mongoose.model('Version', versionSchema);
