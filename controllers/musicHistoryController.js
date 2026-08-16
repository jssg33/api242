const MusicHistory = require('../models/musicHistory');

// Create or increment play count (upsert)
exports.createOrIncrement = async (req, res) => {
    try {
        const {
            userid,
            instanceid,
            title,
            artist,
            album,
            year,
            genre,
            cover,
            youtube
        } = req.body;

        const record = await MusicHistory.findOneAndUpdate(
            { userid, instanceid },
            {
                $set: {
                    title,
                    artist,
                    album,
                    year,
                    genre,
                    cover,
                    youtube,
                    lastPlayed: new Date()
                },
                $inc: { playCount: 1 }
            },
            { new: true, upsert: true }
        );

        res.status(201).json(record);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all music history
exports.getAll = async (req, res) => {
    try {
        const records = await MusicHistory.find();
        res.status(200).json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all music history for a specific user
exports.getByUser = async (req, res) => {
    try {
        const { userid } = req.params;
        const records = await MusicHistory.find({ userid });
        res.status(200).json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single record by ID
exports.getById = async (req, res) => {
    try {
        const record = await MusicHistory.findById(req.params.id);
        if (!record) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(record);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update rating only
exports.updateRating = async (req, res) => {
    try {
        const { rating } = req.body;

        const record = await MusicHistory.findByIdAndUpdate(
            req.params.id,
            { $set: { rating } },
            { new: true }
        );

        if (!record) return res.status(404).json({ message: 'Not found' });
        res.status(200).json(record);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a single record
exports.deleteById = async (req, res) => {
    try {
        const record = await MusicHistory.findByIdAndDelete(req.params.id);
        if (!record) return res.status(404).json({ message: 'Not found' });
        res.status(200).json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete all records for a user
exports.deleteByUser = async (req, res) => {
    try {
        const { userid } = req.params;
        await MusicHistory.deleteMany({ userid });
        res.status(200).json({ message: 'All user music history deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
