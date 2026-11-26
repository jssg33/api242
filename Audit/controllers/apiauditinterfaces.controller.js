// Audit/controllers/apiauditinterfaces.controller.js — port of analyticsgen4rev2/Audit/apiauditinterfaces.controller.cs
// (ApiInterfacesAuditEndpoints).
const ApiInterfacesAudit = require("../models/apiauditinterfaces.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await ApiInterfacesAudit.find());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await ApiInterfacesAudit.findById(req.params.id);
    res.json(item ? [item] : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByApiAuditId = async (req, res) => {
  try {
    res.json(await ApiInterfacesAudit.find({ apiAuditId: Number(req.params.apiAuditId) }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByInterface = async (req, res) => {
  try {
    res.json(await ApiInterfacesAudit.find({ interfaceName: req.params.interfaceName }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const item = await ApiInterfacesAudit.create({ ...req.body, discoveredDate: new Date() });
    res.status(201).json({ message: `Created ID:${item._id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Only overwrites fields the caller actually sent, like the C#.
exports.update = async (req, res) => {
  try {
    const record = await ApiInterfacesAudit.findById(req.params.id);
    if (!record) return res.status(404).end();

    const body = req.body || {};
    if (body.apiHostId != null) record.apiHostId = body.apiHostId;
    if (body.apiAuditId != null) record.apiAuditId = body.apiAuditId;
    if (body.controllerName) record.controllerName = body.controllerName;
    if (body.endpointName) record.endpointName = body.endpointName;
    if (body.route) record.route = body.route;
    if (body.httpMethod) record.httpMethod = body.httpMethod;
    if (body.interfaceName) record.interfaceName = body.interfaceName;
    if (body.implementationName) record.implementationName = body.implementationName;
    if (body.serviceLifetime) record.serviceLifetime = body.serviceLifetime;
    if (body.methodName) record.methodName = body.methodName;
    record.isRegistered = body.isRegistered;
    record.isImplemented = body.isImplemented;

    await record.save();
    res.status(202).json({ message: `Updated ID:${record._id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const record = await ApiInterfacesAudit.findById(req.params.id);
    if (!record) return res.status(404).end();
    await record.deleteOne();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
