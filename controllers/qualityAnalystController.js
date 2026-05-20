// controllers/qualityAnalystController.js
const QualityAnalyst = require('../models/QualityAnalyst');

exports.createQualityAnalyst = async (req, res) => {
  try {
    const analyst = await QualityAnalyst.create(req.body);
    res.status(201).json(analyst);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllQualityAnalysts = async (req, res) => {
  try {
    const list = await QualityAnalyst.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQualityAnalystById = async (req, res) => {
  try {
    const analyst = await QualityAnalyst.findById(req.params.id);
    if (!analyst) return res.status(404).json({ error: 'Not found' });
    res.json(analyst);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateQualityAnalyst = async (req, res) => {
  try {
    const analyst = await QualityAnalyst.findByIdAndUpdate(
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

exports.deleteQualityAnalyst = async (req, res) => {
  try {
    const analyst = await QualityAnalyst.findByIdAndDelete(req.params.id);
    if (!analyst) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Quality Analyst deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
