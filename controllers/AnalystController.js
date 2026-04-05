// controllers/AnalystController.js

const Analyst = require('../models/Analyst');

module.exports = {
  // CREATE
  create: async (req, res) => {
    try {
      const analyst = await Analyst.create(req.body);
      res.status(201).json(analyst);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // GET ALL
  getAll: async (req, res) => {
    try {
      const analysts = await Analyst.find();
      res.json(analysts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET ONE BY _id
  getOne: async (req, res) => {
    try {
      const analyst = await Analyst.findById(req.params.id);
      if (!analyst) return res.status(404).json({ error: 'Not found' });
      res.json(analyst);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET BY USER
  getByUser: async (req, res) => {
    try {
      const analysts = await Analyst.find({ userId: req.params.userId });
      res.json(analysts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET BY REGION
  getByRegion: async (req, res) => {
    try {
      const analysts = await Analyst.find({ region: req.params.region });
      res.json(analysts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // UPDATE
  update: async (req, res) => {
    try {
      const updated = await Analyst.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updated) return res.status(404).json({ error: 'Not found' });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // DELETE
  remove: async (req, res) => {
    try {
      const deleted = await Analyst.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
