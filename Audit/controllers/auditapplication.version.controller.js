// Audit/controllers/auditapplication.version.controller.js — port of
// analyticsgen4rev2/Audit/auditapplication.version.controller.cs (AuditApplicationVersionsController).
const AuditApplicationVersion = require("../models/auditapplicationversion.model");

// GET / -> AuditApplicationVersions.GetAll
exports.getAll = async (req, res) => {
  try {
    res.json(await AuditApplicationVersion.find().sort({ _id: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:id -> AuditApplicationVersions.GetById
exports.getById = async (req, res) => {
  try {
    const item = await AuditApplicationVersion.findById(req.params.id);
    if (!item) return res.status(404).end();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /Application/:applicationId -> AuditApplicationVersions.GetByApplication
exports.getByApplication = async (req, res) => {
  try {
    const rows = await AuditApplicationVersion.find({ auditApplicationId: Number(req.params.applicationId) }).sort({ releaseDate: -1 });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / -> AuditApplicationVersions.Create
exports.create = async (req, res) => {
  try {
    const item = await AuditApplicationVersion.create({ ...req.body, createdDate: new Date() });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /:id -> AuditApplicationVersions.Update
exports.update = async (req, res) => {
  try {
    const item = await AuditApplicationVersion.findById(req.params.id);
    if (!item) return res.status(404).end();

    const fields = [
      "auditApplicationId", "versionNumber", "buildNumber", "releaseName", "releaseType", "sourceControlTag",
      "sourceControlCommit", "isCurrentVersion", "isSupported", "releaseDate", "endOfLifeDate", "releaseNotes",
      "approvedBy", "requestTicket", "isActive"
    ];
    for (const f of fields) if (f in req.body) item[f] = req.body[f];
    item.modifiedDate = new Date();

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /:id -> AuditApplicationVersions.Delete
exports.remove = async (req, res) => {
  try {
    const item = await AuditApplicationVersion.findById(req.params.id);
    if (!item) return res.status(404).end();
    await item.deleteOne();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
