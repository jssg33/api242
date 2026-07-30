// File: controllers/userFriendsController.js

const UserFriends = require('../models/UserFriends');

// CREATE FRIENDSHIP (after approval)
exports.addFriend = async (req, res) => {
    try {
        const entry = new UserFriends(req.body);
        const saved = await entry.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// GET ALL FRIENDS FOR A USER
exports.getFriendsByUser = async (req, res) => {
    try {
        const items = await UserFriends.find({ userId: req.params.userId });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET SINGLE FRIEND RECORD BY _ID
exports.getFriendById = async (req, res) => {
    try {
        const item = await UserFriends.findById(req.params.id);
        if (!item) return res.status(404).json({ error: "Not found" });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE FRIENDSHIP BY _ID
exports.deleteFriend = async (req, res) => {
    try {
        const deleted = await UserFriends.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Not found" });

        res.json({ message: "Friend removed", deleted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE ALL FRIENDS FOR A USER
exports.deleteFriendsByUser = async (req, res) => {
    try {
        const result = await UserFriends.deleteMany({ userId: req.params.userId });

        res.json({
            message: "Deleted all friends for user",
            deletedCount: result.deletedCount
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
