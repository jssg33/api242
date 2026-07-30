// File: models/UserFriendRequests.js

const mongoose = require('mongoose');

const userFriendRequestSchema = new mongoose.Schema({
    _id: { type: String, required: true },

    requesterId: { type: String, required: true },     // person sending the request
    requesterName: { type: String },

    targetId: { type: String, required: true },        // person receiving the request
    targetName: { type: String },

    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Fast lookup indexes
userFriendRequestSchema.index({ requesterId: 1 });
userFriendRequestSchema.index({ targetId: 1 });

module.exports = mongoose.model('UserFriendRequests', userFriendRequestSchema);
