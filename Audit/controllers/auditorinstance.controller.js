// Audit/controllers/auditorinstance.controller.js — port of analyticsgen4rev2/Audit/auditorinstance.controller.cs
// (AuditorInstanceEndpoints).
const AuditorInstance = require("../models/auditorinstance.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await AuditorInstance.find().sort({ siteId: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await AuditorInstance.findById(req.params.id);
    res.json(item ? [item] : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBySite = async (req, res) => {
  try {
    res.json(await AuditorInstance.find({ siteId: req.params.siteId }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByRegion = async (req, res) => {
  try {
    res.json(await AuditorInstance.find({ region: req.params.region }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const item = await AuditorInstance.create(req.body);
    res.status(201).json({ message: `Created ID:${item._id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const instance = await AuditorInstance.findById(req.params.id);
    if (!instance) return res.status(404).end();

    const { siteId, region, country, description, account, subAccount, customer, techContactId, status, version, apiHostId, publicUrl, lastHeartbeat } = req.body;
    Object.assign(instance, { siteId, region, country, description, account, subAccount, customer, techContactId, status, version, apiHostId, publicUrl, lastHeartbeat });

    await instance.save();
    res.status(202).json({ message: `Updated ID:${instance._id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const instance = await AuditorInstance.findById(req.params.id);
    if (!instance) return res.status(404).end();
    await instance.deleteOne();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
