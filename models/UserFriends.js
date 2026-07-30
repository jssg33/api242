// File: models/UserFriends.js

const mongoose = require('mongoose');

const userFriendsSchema = new mongoose.Schema({
    _id: { type: String, required: true },

    userId: { type: String, required: true },      // owner of the friendship record
    friendId: { type: String, required: true },    // approved friend

    friendName: { type: String },                  // optional convenience field
    canSeeLocation: { type: Boolean, default: true },

    createdAt: { type: Date, default: Date.now }
});

// Fast lookup indexes
userFriendsSchema.index({ userId: 1 });
userFriendsSchema.index({ friendId: 1 });

module.exports = mongoose.model('UserFriends', userFriendsSchema);
