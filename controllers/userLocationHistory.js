const UserLocationHistory = require('../models/userLocationHistory');

exports.createLocation = async (req, res) => {
    try {
        const entry = new UserLocationHistory(req.body);
        const saved = await entry.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllLocations = async (req, res) => {
    try {
        const items = await UserLocationHistory.find().sort({ timestamp: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getLocationsByUser = async (req, res) => {
    try {
        const items = await UserLocationHistory.find({ userId: req.params.userId })
            .sort({ timestamp: -1 });

        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteLocation = async (req, res) => {
    try {
        const deleted = await UserLocationHistory.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Not found" });

        res.json({ message: "Deleted", deleted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
