// controllers/AnalystController.js

const Analyst = require('../models/Analyst');

module.exports = {
  // CREATE
  async create(req, res) {
    try {
      const analyst = await Analyst.create(req.body);
      return res.status(201).json(analyst);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // GET ALL
  async getAll(req, res) {
    try {
      const analysts = await Analyst.find();
      return res.json(analysts);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // GET ONE BY _id
  async getOne(req, res) {
    try {
      const analyst = await Analyst.findById(req.params.id);
      if (!analyst) {
        return res.status(404).json({ error: 'Analyst not found' });
      }
      return res.json(analyst);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // GET BY ANALYST ID (your schema has analystId, not userId or region)
  async getByAnalystId(req, res) {
    try {
      const analyst = await Analyst.findOne({ analystId: req.params.analystId });
      if (!analyst) {
        return res.status(404).json({ error: 'Analyst not found' });
      }
      return res.json(analyst);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // UPDATE
  async update(req, res) {
    try {
      const updated = await Analyst.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updated) {
        return res.status(404).json({ error: 'Analyst not found' });
      }

      return res.json(updated);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  // DELETE
  async remove(req, res) {
    try {
      const deleted = await Analyst.findByIdAndDelete(req.params.id);

      if (!deleted) {
        return res.status(404).json({ error: 'Analyst not found' });
      }

      return res.json({ message: 'Analyst deleted successfully' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};

