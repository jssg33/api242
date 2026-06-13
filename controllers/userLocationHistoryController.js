const UserLocationHistory = require('../models/userLocationHistory');

// CREATE (standard POST)
exports.createLocation = async (req, res) => {
    try {
        const entry = new UserLocationHistory(req.body);
        const saved = await entry.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// CREATE BY USER ID (POST /user/:userId)
exports.createLocationByUserId = async (req, res) => {
    try {
        const data = {
            ...req.body,
            userId: req.params.userId
        };

        const entry = new UserLocationHistory(data);
        const saved = await entry.save();

        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// READ ALL
exports.getAllLocations = async (req, res) => {
    try {
        const items = await UserLocationHistory.find().sort({ timestamp: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ BY USER ID
exports.getLocationsByUser = async (req, res) => {
    try {
        const items = await UserLocationHistory.find({ userId: req.params.userId })
            .sort({ timestamp: -1 });

        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE BY MONGO _ID
exports.deleteLocation = async (req, res) => {
    try {
        const deleted = await UserLocationHistory.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Not found" });

        res.json({ message: "Deleted", deleted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE ALL RECORDS FOR A USER
exports.deleteByUserId = async (req, res) => {
    try {
        const result = await UserLocationHistory.deleteMany({ userId: req.params.userId });

        res.json({
            message: "Deleted all records for user",
            deletedCount: result.deletedCount
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
