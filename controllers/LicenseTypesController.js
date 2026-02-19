const LicenseType = require('../models/LicenseType');

class LicenseTypesController {

  // GET all license types
  static async getAll(req, res) {
    try {
      const types = await LicenseType.find();
      res.json(types);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // GET by ID
  static async getById(req, res) {
    try {
      const type = await LicenseType.findOne({ LicenseTypeID: req.params.id });

      if (!type) {
        return res.status(404).json({ message: "License type not found" });
      }

      res.json(type);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // CREATE
  static async create(req, res) {
    try {
      const newType = await LicenseType.create(req.body);
      res.status(201).json(newType);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // UPDATE
  static async update(req, res) {
    try {
      const updated = await LicenseType.findOneAndUpdate(
        { LicenseTypeID: req.params.id },
        req.body,
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ message: "License type not found" });
      }

      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // DELETE
  static async delete(req, res) {
    try {
      const deleted = await LicenseType.findOneAndDelete({
        LicenseTypeID: req.params.id
      });

      if (!deleted) {
        return res.status(404).json({ message: "License type not found" });
      }

      res.json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = LicenseTypesController;
