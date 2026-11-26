// Audit/controllers/apiauditexceptionscontroller.js — port of analyticsgen4rev2/Audit/apiauditexceptionscontroller.cs
// (AuditExceptionEndpoints). Model lives in auditexceptions.model.js (file-base mismatch inherited from the C#).
const AuditException = require("../models/auditexceptions.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await AuditException.find());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await AuditException.findById(req.params.id);
    res.json(item ? [item] : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByApiAuditId = async (req, res) => {
  try {
    res.json(await AuditException.find({ apiAuditId: Number(req.params.apiAuditId) }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getActive = async (req, res) => {
  try {
    res.json(await AuditException.find({ active: true }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const item = await AuditException.create(req.body);
    res.status(201).json({ message: `Created ID:${item._id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await AuditException.findById(req.params.id);
    if (!item) return res.status(404).end();

    const { apiAuditId, reason, approvedBy, approvalDate, expirationDate, active, notes, apiRootUrl, apiEndpointPath } = req.body;
    Object.assign(item, { apiAuditId, reason, approvedBy, approvalDate, expirationDate, active, notes, apiRootUrl, apiEndpointPath });

    await item.save();
    res.status(202).json({ message: `Updated ID:${item._id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await AuditException.findById(req.params.id);
    if (!item) return res.status(404).end();
    await item.deleteOne();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
