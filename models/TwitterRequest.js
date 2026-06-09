// models/TwitterRequest.js

const mongoose = require('mongoose');

const TwitterRequestSchema = new mongoose.Schema({
    userid: { type: String, required: true },
    twittername: { type: String, required: true },
    twitterpassword: { type: String, required: true },
    requesttype: { type: Number, enum: [1, 2, 3, 4], required: true },
    oathstring: { type: String, required: false },

    processed: { type: Boolean, default: false },

    // Optional, but defaults to now if missing
    processedAt: { type: Date, default: Date.now },

}, { timestamps: true }); // createdAt + updatedAt auto-managed
// createdAt = auto timestamp
// updatedAt disabled unless you want it

module.exports = mongoose.model('TwitterRequest', TwitterRequestSchema);
