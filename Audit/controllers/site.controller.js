// Audit/controllers/site.controller.js — port of analyticsgen4rev2/Audit/site.controller.cs (SitesController).
const Site = require("../models/site.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Site.find());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    if (!site) return res.status(404).end();
    res.json(site);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    res.status(201).json(await Site.create(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const existing = await Site.findById(req.params.id);
    if (!existing) return res.status(404).end();

    const { siteName, siteCode, address1, address2, city, state, postalCode, country, phoneNumber, siteManager, isActive, notes } = req.body;
    Object.assign(existing, {
      siteName, siteCode, address1, address2, city, state, postalCode, country, phoneNumber, siteManager, isActive, notes
    });

    await existing.save();
    res.json(existing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const existing = await Site.findById(req.params.id);
    if (!existing) return res.status(404).end();
    await existing.deleteOne();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
