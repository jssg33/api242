// Audit/controllers/apiapplicationapi.controller.js — port of analyticsgen4rev2/Audit/apiapplicationapi.controller.cs
// (ApplicationApiController).
const ApplicationApi = require("../models/apiapplicationapi.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await ApplicationApi.find().sort({ applicationId: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await ApplicationApi.findById(req.params.id);
    if (!item) return res.status(404).end();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByApplication = async (req, res) => {
  try {
    const items = await ApplicationApi.find({ applicationId: req.params.applicationId }).sort({ _id: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByHost = async (req, res) => {
  try {
    const items = await ApplicationApi.find({ apiHostId: req.params.apiHostId }).sort({ _id: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const item = await ApplicationApi.create({ ...req.body, createdDate: req.body.createdDate || new Date() });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await ApplicationApi.findById(req.params.id);
    if (!item) return res.status(404).end();

    const { applicationId, apiHostId, databaseId } = req.body;
    Object.assign(item, { applicationId, apiHostId, databaseId });

    await item.save();
    res.status(202).json({ message: `Updated ID:${item._id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await ApplicationApi.findById(req.params.id);
    if (!item) return res.status(404).end();
    await item.deleteOne();
    res.status(202).json({ message: `Deleted ID:${req.params.id}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
