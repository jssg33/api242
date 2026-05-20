// controllers/careManagerController.js
const CareManager = require('../models/CareManager');

exports.createCareManager = async (req, res) => {
  try {
    const manager = await CareManager.create(req.body);
    res.status(201).json(manager);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllCareManagers = async (req, res) => {
  try {
    const list = await CareManager.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCareManagerById = async (req, res) => {
  try {
    const manager = await CareManager.findById(req.params.id);
    if (!manager) return res.status(404).json({ error: 'Not found' });
    res.json(manager);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCareManager = async (req, res) => {
  try {
    const manager = await CareManager.findByIdAndUpdate(
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

exports.deleteCareManager = async (req, res) => {
  try {
    const manager = await CareManager.findByIdAndDelete(req.params.id);
    if (!manager) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Care Manager deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
