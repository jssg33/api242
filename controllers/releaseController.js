// controllers/releaseController.js
const Release = require('../models/release');

// Create a new release
exports.createRelease = async (req, res) => {
  try {
    const release = new Release(req.body);
    const saved = await release.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all releases
exports.getReleases = async (req, res) => {
  try {
    const releases = await Release.find();
    res.json(releases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single release by ID
exports.getReleaseById = async (req, res) => {
  try {
    const release = await Release.findById(req.params.id);
    if (!release) return res.status(404).json({ error: 'Release not found' });
    res.json(release);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a release
exports.updateRelease = async (req, res) => {
  try {
    const updated = await Release.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Release not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a release
exports.deleteRelease = async (req, res) => {
  try {
    const deleted = await Release.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Release not found' });
    res.json({ message: 'Release deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
