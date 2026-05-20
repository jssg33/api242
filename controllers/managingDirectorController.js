// controllers/managingDirectorController.js
const ManagingDirector = require('../models/ManagingDirector');

exports.createManagingDirector = async (req, res) => {
  try {
    const md = await ManagingDirector.create(req.body);
    res.status(201).json(md);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllManagingDirectors = async (req, res) => {
  try {
    const list = await ManagingDirector.find()
      .populate('directorlist')
      .populate('businessdirectorlist');
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getManagingDirectorById = async (req, res) => {
  try {
    const md = await ManagingDirector.findById(req.params.id)
      .populate('directorlist')
      .populate('businessdirectorlist');
    if (!md) return res.status(404).json({ error: 'Not found' });
    res.json(md);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateManagingDirector = async (req, res) => {
  try {
    const md = await ManagingDirector.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate('directorlist')
      .populate('businessdirectorlist');

    if (!md) return res.status(404).json({ error: 'Not found' });
    res.json(md);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteManagingDirector = async (req, res) => {
  try {
    const md = await ManagingDirector.findByIdAndDelete(req.params.id);
    if (!md) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Managing Director deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
