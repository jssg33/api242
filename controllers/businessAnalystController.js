// controllers/businessAnalystController.js
const BusinessAnalyst = require('../models/BusinessAnalyst');

exports.createBusinessAnalyst = async (req, res) => {
  try {
    const analyst = await BusinessAnalyst.create(req.body);
    res.status(201).json(analyst);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllBusinessAnalysts = async (req, res) => {
  try {
    const list = await BusinessAnalyst.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBusinessAnalystById = async (req, res) => {
  try {
    const analyst = await BusinessAnalyst.findById(req.params.id);
    if (!analyst) return res.status(404).json({ error: 'Not found' });
    res.json(analyst);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBusinessAnalyst = async (req, res) => {
  try {
    const analyst = await BusinessAnalyst.findByIdAndUpdate(
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

exports.deleteBusinessAnalyst = async (req, res) => {
  try {
    const analyst = await BusinessAnalyst.findByIdAndDelete(req.params.id);
    if (!analyst) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Business Analyst deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
