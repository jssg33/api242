// Audit/controllers/apienterprisenine.controller.js — port of analyticsgen4rev2/Audit/apienterprisenine.controller.cs
// (Enterprise9Controller).
const Enterprise9 = require("../models/apienterprisenine.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Enterprise9.find().sort({ apiHostName: 1, logName: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Enterprise9.findById(req.params.id);
    if (!item) return res.status(404).end();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByHost = async (req, res) => {
  try {
    res.json(await Enterprise9.find({ apiHostId: Number(req.params.apiHostId) }).sort({ logName: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRequired = async (req, res) => {
  try {
    res.json(await Enterprise9.find({ isRequired: true }).sort({ logName: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const item = await Enterprise9.create({ ...req.body, createdDate: new Date() });
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
    const items = await Enterprise9.insertMany(inputs.map((i) => ({ ...i, createdDate: now })));
    res.json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const existing = await Enterprise9.findById(req.params.id);
    if (!existing) return res.status(404).end();

    const { apiHostId, apiHostName, logName, logDescription, endpointUrl, httpMethod, isRequired, isImplemented, lastValidated, notes, isActive, apiServiceId, apiServiceName } = req.body;
    Object.assign(existing, {
      apiHostId, apiHostName, logName, logDescription, endpointUrl, httpMethod, isRequired, isImplemented,
      lastValidated, notes, isActive, apiServiceId, apiServiceName, modifiedDate: new Date()
    });

    await existing.save();
    res.json(existing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const existing = await Enterprise9.findById(req.params.id);
    if (!existing) return res.status(404).end();
    await existing.deleteOne();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.discoveryInfo = async (req, res) => {
  try {
    const count = await Enterprise9.countDocuments();
    res.json({ controller: "Enterprise9Controller", entity: "Enterprise9", recordCount: count, discoveryDate: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHostSummary = async (req, res) => {
  try {
    const logs = await Enterprise9.find({ apiHostId: Number(req.params.apiHostId) }).lean();
    res.json({
      apiHostId: Number(req.params.apiHostId),
      totalLogs: logs.length,
      requiredLogs: logs.filter((x) => x.isRequired).length,
      implementedLogs: logs.filter((x) => x.isImplemented).length,
      missingLogs: logs.filter((x) => x.isRequired && !x.isImplemented).length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
