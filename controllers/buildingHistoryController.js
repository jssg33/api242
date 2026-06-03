const BuildingHistory = require('../models/buildingHistory');

// Create new building history entry
exports.createBuildingHistory = async (req, res) => {
    try {
        const entry = new BuildingHistory(req.body);
        const saved = await entry.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all building history entries
exports.getAllBuildingHistory = async (req, res) => {
    try {
        const entries = await BuildingHistory.find();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get history by buildingId
exports.getHistoryByBuildingId = async (req, res) => {
    try {
        const entries = await BuildingHistory.find({ buildingId: req.params.buildingId });
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete entry by ID
exports.deleteBuildingHistory = async (req, res) => {
    try {
        const deleted = await BuildingHistory.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Entry not found" });
        res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
