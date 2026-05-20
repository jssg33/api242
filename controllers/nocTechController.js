// controllers/nocTechController.js
const NocTech = require('../models/NocTech');

exports.createNocTech = async (req, res) => {
  try {
    const tech = await NocTech.create(req.body);
    res.status(201).json(tech);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllNocTechs = async (req, res) => {
  try {
    const list = await NocTech.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNocTechById = async (req, res) => {
  try {
    const tech = await NocTech.findById(req.params.id);
    if (!tech) return res.status(404).json({ error: 'Not found' });
    res.json(tech);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateNocTech = async (req, res) => {
  try {
    const tech = await NocTech.findByIdAndUpdate(
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

exports.deleteNocTech = async (req, res) => {
  try {
    const tech = await NocTech.findByIdAndDelete(req.params.id);
    if (!tech) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'NOC Tech deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
