// controllers/directorController.js
const Director = require('../models/Director');

exports.createDirector = async (req, res) => {
  try {
    const director = await Director.create(req.body);
    res.status(201).json(director);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllDirectors = async (req, res) => {
  try {
    const list = await Director.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDirectorById = async (req, res) => {
  try {
    const director = await Director.findById(req.params.id);
    if (!director) return res.status(404).json({ error: 'Not found' });
    res.json(director);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDirector = async (req, res) => {
  try {
    const director = await Director.findByIdAndUpdate(
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

exports.deleteDirector = async (req, res) => {
  try {
    const director = await Director.findByIdAndDelete(req.params.id);
    if (!director) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Director deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
