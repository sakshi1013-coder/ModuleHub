const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
    version: { type: String, required: true },
    changelog: { type: String, default: '' },
    publishedAt: { type: Date, default: Date.now },
    publishedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const packageSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    currentVersion: {
        type: String,
        default: '0.0.0'
    },
    versions: [versionSchema],
    documentation: {
        type: String, // Markdown content
        default: ''
    },
    dependencies: [{ // Optional: List of other internal packages
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package'
    }]
}, { timestamps: true });

// Ensure package names are unique within a company (optional, or globally unique)
packageSchema.index({ company: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Package', packageSchema);
