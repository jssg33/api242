const mongoose = require('mongoose');
const TwitterRequest = require('../models/TwitterRequest');

// Helper: validate ObjectId
const validateId = (id) => mongoose.Types.ObjectId.isValid(id);

// CREATE
exports.createTwitterRequest = async (req, res) => {
    try {
        const request = await TwitterRequest.create(req.body);
        res.status(201).json(request);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// READ ALL
exports.getAllTwitterRequests = async (req, res) => {
    try {
        const requests = await TwitterRequest.find();
        res.json(requests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ ONE
exports.getTwitterRequestById = async (req, res) => {
    try {
        if (!validateId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const request = await TwitterRequest.findById(req.params.id);
        if (!request) return res.status(404).json({ error: 'Not found' });

        res.json(request);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// UPDATE
exports.updateTwitterRequest = async (req, res) => {
    try {
        if (!validateId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const request = await TwitterRequest.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!request) return res.status(404).json({ error: 'Not found' });

        res.json(request);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE
exports.deleteTwitterRequest = async (req, res) => {
    try {
        if (!validateId(req.params.id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const request = await TwitterRequest.findByIdAndDelete(req.params.id);
        if (!request) return res.status(404).json({ error: 'Not found' });

        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
