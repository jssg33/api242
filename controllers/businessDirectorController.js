// controllers/businessDirectorController.js
const BusinessDirector = require('../models/BusinessDirector');

exports.createBusinessDirector = async (req, res) => {
  try {
    const director = await BusinessDirector.create(req.body);
    res.status(201).json(director);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllBusinessDirectors = async (req, res) => {
  try {
    const list = await BusinessDirector.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBusinessDirectorById = async (req, res) => {
  try {
    const director = await BusinessDirector.findById(req.params.id);
    if (!director) return res.status(404).json({ error: 'Not found' });
    res.json(director);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBusinessDirector = async (req, res) => {
  try {
    const director = await BusinessDirector.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!director) return res.status(404).json({ error: 'Not found' });
    res.json(director);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBusinessDirector = async (req, res) => {
  try {
    const director = await BusinessDirector.findByIdAndDelete(req.params.id);
    if (!director) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Business Director deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
