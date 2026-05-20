// controllers/buExecutiveController.js
const BUExecutive = require('../models/BUExecutive');

exports.createBUExecutive = async (req, res) => {
  try {
    const exec = await BUExecutive.create(req.body);
    res.status(201).json(exec);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllBUExecutives = async (req, res) => {
  try {
    const list = await BUExecutive.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBUExecutiveById = async (req, res) => {
  try {
    const exec = await BUExecutive.findById(req.params.id);
    if (!exec) return res.status(404).json({ error: 'Not found' });
    res.json(exec);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBUExecutive = async (req, res) => {
  try {
    const exec = await BUExecutive.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!exec) return res.status(404).json({ error: 'Not found' });
    res.json(exec);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBUExecutive = async (req, res) => {
  try {
    const exec = await BUExecutive.findByIdAndDelete(req.params.id);
    if (!exec) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'BU Executive deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
