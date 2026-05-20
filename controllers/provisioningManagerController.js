// controllers/provisioningManagerController.js
const ProvisioningManager = require('../models/ProvisioningManager');

// Create
exports.createProvisioningManager = async (req, res) => {
  try {
    const manager = await ProvisioningManager.create(req.body);
    res.status(201).json(manager);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all
exports.getAllProvisioningManagers = async (req, res) => {
  try {
    const list = await ProvisioningManager.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one
exports.getProvisioningManagerById = async (req, res) => {
  try {
    const manager = await ProvisioningManager.findById(req.params.id);
    if (!manager) return res.status(404).json({ error: 'Not found' });
    res.json(manager);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateProvisioningManager = async (req, res) => {
  try {
    const manager = await ProvisioningManager.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!manager) return res.status(404).json({ error: 'Not found' });
    res.json(manager);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteProvisioningManager = async (req, res) => {
  try {
    const manager = await ProvisioningManager.findByIdAndDelete(req.params.id);
    if (!manager) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Provisioning Manager deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
