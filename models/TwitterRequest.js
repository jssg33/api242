// models/TwitterRequest.js

const mongoose = require('mongoose');

const TwitterRequestSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    twittername: { type: String, required: true },
    twitterpassword: { type: String, required: true },
    requesttype: { type: Number, enum: [1, 2, 3, 4], required: true },

    // New fields
    processed: { type: Boolean, default: false },
    processedAt: { type: Date, default: null },

}, { timestamps: { createdAt: true, updatedAt: false } });
// createdAt = auto timestamp
// updatedAt disabled unless you want it

module.exports = mongoose.model('TwitterRequest', TwitterRequestSchema);
