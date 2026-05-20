// controllers/fieldTechManagerController.js
const FieldTechManager = require('../models/FieldTechManager');

exports.createFieldTechManager = async (req, res) => {
  try {
    const manager = await FieldTechManager.create(req.body);
    res.status(201).json(manager);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllFieldTechManagers = async (req, res) => {
  try {
    const list = await FieldTechManager.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFieldTechManagerById = async (req, res) => {
  try {
    const manager = await FieldTechManager.findById(req.params.id);
    if (!manager) return res.status(404).json({ error: 'Not found' });
    res.json(manager);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFieldTechManager = async (req, res) => {
  try {
    const manager = await FieldTechManager.findByIdAndUpdate(
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

exports.deleteFieldTechManager = async (req, res) => {
  try {
    const manager = await FieldTechManager.findByIdAndDelete(req.params.id);
    if (!manager) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Field Tech Manager deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
