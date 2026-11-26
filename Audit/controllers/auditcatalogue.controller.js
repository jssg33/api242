// Audit/controllers/auditcatalogue.controller.js — port of analyticsgen4rev2/Audit/auditcatalogue.controller.cs
// (AuditCatalogueEndpoints).
const AuditCatalogue = require("../models/auditcatalogue.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await AuditCatalogue.find().sort({ auditCode: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await AuditCatalogue.findById(req.params.id);
    res.json(item ? [item] : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getActive = async (req, res) => {
  try {
    res.json(await AuditCatalogue.find({ isActive: true }).sort({ auditName: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByCategory = async (req, res) => {
  try {
    res.json(await AuditCatalogue.find({ category: req.params.category }).sort({ auditName: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBySeverity = async (req, res) => {
  try {
    res.json(await AuditCatalogue.find({ severity: req.params.severity }).sort({ auditName: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const item = await AuditCatalogue.create({ ...req.body, createdDate: new Date() });
    res.status(201).json({ message: `Created ID:${item._id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const audit = await AuditCatalogue.findById(req.params.id);
    if (!audit) return res.status(404).end();

    const { auditCode, auditName, description, category, subCategory, severity, auditType, recommendedAction, complianceFramework, isAutomated, isActive, notes } = req.body;
    Object.assign(audit, { auditCode, auditName, description, category, subCategory, severity, auditType, recommendedAction, complianceFramework, isAutomated, isActive, notes });
    audit.modifiedDate = new Date();

    await audit.save();
    res.status(202).json({ message: `Updated ID:${audit._id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const audit = await AuditCatalogue.findById(req.params.id);
    if (!audit) return res.status(404).end();
    await audit.deleteOne();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
