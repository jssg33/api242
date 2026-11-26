// Audit/controllers/apiservices.controller.js — port of analyticsgen4rev2/Audit/apiservices.controller.cs (ApiServicesController).
const ApiService = require("../models/apiservices.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await ApiService.find().sort({ serviceName: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await ApiService.findById(req.params.id);
    if (!item) return res.status(404).end();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const item = await ApiService.create({ ...req.body, createdDate: new Date() });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createBulk = async (req, res) => {
  try {
    const inputs = req.body;
    if (!Array.isArray(inputs) || inputs.length === 0) {
      return res.status(400).json({ error: "No records supplied." });
    }
    const now = new Date();
    const items = await ApiService.insertMany(inputs.map((i) => ({ ...i, createdDate: now })));
    res.json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const existing = await ApiService.findById(req.params.id);
    if (!existing) return res.status(404).end();

    const { serviceName, interfaceId, interfaceName, implementationClass, description, serviceType, serviceOwner, apiHostName, apiHostId, isActive } = req.body;
    Object.assign(existing, {
      serviceName, interfaceId, interfaceName, implementationClass, description, serviceType, serviceOwner,
      apiHostName, apiHostId, isActive, modifiedDate: new Date()
    });

    await existing.save();
    res.json(existing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const existing = await ApiService.findById(req.params.id);
    if (!existing) return res.status(404).end();
    await existing.deleteOne();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getActive = async (req, res) => {
  try {
    res.json(await ApiService.find({ isActive: true }).sort({ serviceName: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.discoveryInfo = async (req, res) => {
  try {
    const count = await ApiService.countDocuments();
    res.json({ controller: "ApiServicesController", entity: "ApiService", recordCount: count, discoveryDate: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
