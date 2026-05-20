// controllers/provisionerController.js
const Provisioner = require('../models/Provisioner');

// Create
exports.createProvisioner = async (req, res) => {
  try {
    const provisioner = await Provisioner.create(req.body);
    res.status(201).json(provisioner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all
exports.getAllProvisioners = async (req, res) => {
  try {
    const list = await Provisioner.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one
exports.getProvisionerById = async (req, res) => {
  try {
    const provisioner = await Provisioner.findById(req.params.id);
    if (!provisioner) return res.status(404).json({ error: 'Not found' });
    res.json(provisioner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateProvisioner = async (req, res) => {
  try {
    const provisioner = await Provisioner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!provisioner) return res.status(404).json({ error: 'Not found' });
    res.json(provisioner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteProvisioner = async (req, res) => {
  try {
    const provisioner = await Provisioner.findByIdAndDelete(req.params.id);
    if (!provisioner) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Provisioner deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
