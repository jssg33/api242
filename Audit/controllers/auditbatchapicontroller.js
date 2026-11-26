// Audit/controllers/auditbatchapicontroller.js — port of analyticsgen4rev2/Audit/auditbatchapicontroller.cs
// (AuditBatchApiEndpoints). Read/Create/Delete only — no update endpoint in the C# source.
const AuditBatchApi = require("../models/auditbatchapi.model");

// GET / -> IAuditBatchApiService06.GetAll06
exports.getAll = async (req, res) => {
  try {
    res.json(await AuditBatchApi.find().sort({ auditDate: -1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:id -> IAuditBatchApiService06.GetById06
exports.getById = async (req, res) => {
  try {
    const row = await AuditBatchApi.findById(req.params.id);
    res.json(row ? [row] : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /run/:auditResultId -> IAuditBatchApiService06.GetByRun06
exports.getByRun = async (req, res) => {
  try {
    const rows = await AuditBatchApi.find({ auditResultId: Number(req.params.auditResultId) }).sort({ apiHostName: 1 });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / -> IAuditBatchApiService06.Create06
exports.create = async (req, res) => {
  try {
    const row = await AuditBatchApi.create(req.body);
    res.status(201).json({ message: `Created ID:${row._id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /:id -> IAuditBatchApiService06.Delete06
exports.remove = async (req, res) => {
  try {
    const row = await AuditBatchApi.findById(req.params.id);
    if (!row) return res.status(404).end();
    await row.deleteOne();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
