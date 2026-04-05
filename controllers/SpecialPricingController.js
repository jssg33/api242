// controllers/SpecialPricingController.js

const SpecialPricing = require('../models/SpecialPricing.model');

module.exports = {
  // CREATE
  create: async (req, res) => {
    try {
      const request = await SpecialPricing.create(req.body);
      res.status(201).json(request);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // GET ALL
  getAll: async (req, res) => {
    try {
      const requests = await SpecialPricing.find();
      res.json(requests);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET ONE BY _id
  getOne: async (req, res) => {
    try {
      const request = await SpecialPricing.findById(req.params.id);
      if (!request) return res.status(404).json({ error: 'Not found' });
      res.json(request);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET BY USER
  getByUser: async (req, res) => {
    try {
      const requests = await SpecialPricing.find({ userId: req.params.userId });
      res.json(requests);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET BY REGION
  getByRegion: async (req, res) => {
    try {
      const requests = await SpecialPricing.find({ region: req.params.region });
      res.json(requests);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // UPDATE
  update: async (req, res) => {
    try {
      const updated = await SpecialPricing.findByIdAndUpdate(
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
      const deleted = await SpecialPricing.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Not found' });
      res.json({ message: 'Deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
