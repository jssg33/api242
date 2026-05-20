// controllers/fieldTechController.js
const FieldTech = require('../models/FieldTech');

exports.createFieldTech = async (req, res) => {
  try {
    const tech = await FieldTech.create(req.body);
    res.status(201).json(tech);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllFieldTechs = async (req, res) => {
  try {
    const list = await FieldTech.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFieldTechById = async (req, res) => {
  try {
    const tech = await FieldTech.findById(req.params.id);
    if (!tech) return res.status(404).json({ error: 'Not found' });
    res.json(tech);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFieldTech = async (req, res) => {
  try {
    const tech = await FieldTech.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!tech) return res.status(404).json({ error: 'Not found' });
    res.json(tech);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteFieldTech = async (req, res) => {
  try {
    const tech = await FieldTech.findByIdAndDelete(req.params.id);
    if (!tech) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Field Tech deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
