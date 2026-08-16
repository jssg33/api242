const FeatureHistory = require('../models/featureHistory');

// Create or increment feature usage
exports.createOrIncrement = async (req, res) => {
    try {
        const { userId, featureId, featureName } = req.body;

        const record = await FeatureHistory.findOneAndUpdate(
            { userId, featureId },
            { 
                $set: { featureName, lastUsed: new Date() },
                $inc: { useCount: 1 }
            },
            { new: true, upsert: true }
        );

        res.status(201).json(record);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all feature history
exports.getAll = async (req, res) => {
    try {
        const records = await FeatureHistory.find();
        res.status(200).json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all features for a specific user
exports.getByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const records = await FeatureHistory.find({ userId });
        res.status(200).json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single feature record by ID
exports.getById = async (req, res) => {
    try {
        const record = await FeatureHistory.findById(req.params.id);
        if (!record) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(record);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a single record
exports.deleteById = async (req, res) => {
    try {
        const record = await FeatureHistory.findByIdAndDelete(req.params.id);
        if (!record) return res.status(404).json({ message: 'Not found' });
        res.status(200).json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete all records for a user
exports.deleteByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        await FeatureHistory.deleteMany({ userId });
        res.status(200).json({ message: 'All user feature history deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
