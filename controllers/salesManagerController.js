// controllers/salesManagerController.js
const SalesManager = require('../models/SalesManager');

// Create manager
exports.createManager = async (req, res) => {
  try {
    const manager = await SalesManager.create(req.body);
    res.status(201).json(manager);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all managers
exports.getManagers = async (req, res) => {
  try {
    const managers = await SalesManager.find();
    res.json(managers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get manager by ID
exports.getManagerById = async (req, res) => {
  try {
    const manager = await SalesManager.findById(req.params.id);
    if (!manager) return res.status(404).json({ error: 'Not found' });
    res.json(manager);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update manager
exports.updateManager = async (req, res) => {
  try {
    const updated = await SalesManager.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete manager
exports.deleteManager = async (req, res) => {
  try {
    const deleted = await SalesManager.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Manager deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
