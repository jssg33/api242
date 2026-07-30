// File: controllers/userFriendRequestsController.js

const UserFriendRequests = require('../models/UserFriendRequests');
const UserFriends = require('../models/UserFriends');

// CREATE FRIEND REQUEST
exports.createRequest = async (req, res) => {
    try {
        const entry = new UserFriendRequests(req.body);
        const saved = await entry.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// GET ALL REQUESTS FOR A USER (incoming)
exports.getRequestsForUser = async (req, res) => {
    try {
        const items = await UserFriendRequests.find({ targetId: req.params.userId });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET ALL REQUESTS SENT BY A USER (outgoing)
exports.getRequestsByUser = async (req, res) => {
    try {
        const items = await UserFriendRequests.find({ requesterId: req.params.userId });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET SINGLE REQUEST BY _ID
exports.getRequestById = async (req, res) => {
    try {
        const item = await UserFriendRequests.findById(req.params.id);
        if (!item) return res.status(404).json({ error: "Not found" });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// APPROVE REQUEST
exports.approveRequest = async (req, res) => {
    try {
        const request = await UserFriendRequests.findById(req.params.id);
        if (!request) return res.status(404).json({ error: "Request not found" });

        request.status = "accepted";
        await request.save();

        // Create friendship record
        const friendship = new UserFriends({
            _id: req.body._id, // required by your system
            userId: request.targetId,
            friendId: request.requesterId,
            friendName: request.requesterName,
            canSeeLocation: true
        });

        const savedFriend = await friendship.save();

        res.json({
            message: "Friend request approved",
            request,
            friendship: savedFriend
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// REJECT REQUEST
exports.rejectRequest = async (req, res) => {
    try {
        const request = await UserFriendRequests.findById(req.params.id);
        if (!request) return res.status(404).json({ error: "Request not found" });

        request.status = "rejected";
        await request.save();

        res.json({ message: "Friend request rejected", request });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE REQUEST
exports.deleteRequest = async (req, res) => {
    try {
        const deleted = await UserFriendRequests.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Not found" });

        res.json({ message: "Request deleted", deleted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
