// controllers/salespersonController.js
const Salesperson = require('../models/Salesperson');

// Create a salesperson
exports.createSalesperson = async (req, res) => {
  try {
    const person = await Salesperson.create(req.body);
    res.status(201).json(person);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all salespeople
exports.getSalespeople = async (req, res) => {
  try {
    const people = await Salesperson.find();
    res.json(people);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one salesperson
exports.getSalespersonById = async (req, res) => {
  try {
    const person = await Salesperson.findById(req.params.id);
    if (!person) return res.status(404).json({ error: 'Not found' });
    res.json(person);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update salesperson
exports.updateSalesperson = async (req, res) => {
  try {
    const updated = await Salesperson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete salesperson
exports.deleteSalesperson = async (req, res) => {
  try {
    const deleted = await Salesperson.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Salesperson deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
