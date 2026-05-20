// controllers/qualityManagerController.js
const QualityManager = require('../models/QualityManager');

exports.createQualityManager = async (req, res) => {
  try {
    const manager = await QualityManager.create(req.body);
    res.status(201).json(manager);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllQualityManagers = async (req, res) => {
  try {
    const list = await QualityManager.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQualityManagerById = async (req, res) => {
  try {
    const manager = await QualityManager.findById(req.params.id);
    if (!manager) return res.status(404).json({ error: 'Not found' });
    res.json(manager);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateQualityManager = async (req, res) => {
  try {
    const manager = await QualityManager.findByIdAndUpdate(
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

exports.deleteQualityManager = async (req, res) => {
  try {
    const manager = await QualityManager.findByIdAndDelete(req.params.id);
    if (!manager) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Quality Manager deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
