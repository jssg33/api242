// controllers/careAnalystController.js
const CareAnalyst = require('../models/CareAnalyst');

exports.createCareAnalyst = async (req, res) => {
  try {
    const analyst = await CareAnalyst.create(req.body);
    res.status(201).json(analyst);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllCareAnalysts = async (req, res) => {
  try {
    const list = await CareAnalyst.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCareAnalystById = async (req, res) => {
  try {
    const analyst = await CareAnalyst.findById(req.params.id);
    if (!analyst) return res.status(404).json({ error: 'Not found' });
    res.json(analyst);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCareAnalyst = async (req, res) => {
  try {
    const analyst = await CareAnalyst.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!analyst) return res.status(404).json({ error: 'Not found' });
    res.json(analyst);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCareAnalyst = async (req, res) => {
  try {
    const analyst = await CareAnalyst.findByIdAndDelete(req.params.id);
    if (!analyst) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Care Analyst deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
