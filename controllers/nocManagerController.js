// controllers/nocManagerController.js
const NocManager = require('../models/NocManager');

exports.createNocManager = async (req, res) => {
  try {
    const manager = await NocManager.create(req.body);
    res.status(201).json(manager);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllNocManagers = async (req, res) => {
  try {
    const list = await NocManager.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNocManagerById = async (req, res) => {
  try {
    const manager = await NocManager.findById(req.params.id);
    if (!manager) return res.status(404).json({ error: 'Not found' });
    res.json(manager);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateNocManager = async (req, res) => {
  try {
    const manager = await NocManager.findByIdAndUpdate(
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

exports.deleteNocManager = async (req, res) => {
  try {
    const manager = await NocManager.findByIdAndDelete(req.params.id);
    if (!manager) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'NOC Manager deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
