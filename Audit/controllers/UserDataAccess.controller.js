// Audit/controllers/UserDataAccess.controller.js — port of analyticsgen4rev2/Audit/UserDataAccess.controller.cs
// (UserDataAccessEndpoints). FismaHigh-classified in the C# source (x-data-classification metadata) — same
// FusionAuth credential check as every other Audit controller, just worth keeping in mind for this one.
const UserDataAccess = require("../models/UserDataAccess.model");

// GET / -> IUserDataAccessService21.GetAll21
exports.getAll = async (req, res) => {
  try {
    res.json(await UserDataAccess.find().sort({ _id: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:id -> IUserDataAccessService21.GetById21
exports.getById = async (req, res) => {
  try {
    const row = await UserDataAccess.findById(req.params.id);
    res.json(row ? [row] : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / -> IUserDataAccessService21.Create21
exports.create = async (req, res) => {
  try {
    const input = { ...req.body };
    delete input._id;
    if (!input.userId || input.userId <= 0) return res.status(400).json({ error: "UserId is required." });
    if (!("isActive" in req.body)) input.isActive = true;

    const saved = await UserDataAccess.create(input);
    res.json({ success: true, id: saved._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /:id -> IUserDataAccessService21.Update21 (only fields present in the body are copied)
exports.update = async (req, res) => {
  try {
    const existing = await UserDataAccess.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: `No UserDataAccess with Id ${req.params.id}.` });

    const body = req.body;
    const has = (f) => f in body;

    if (has("userId")) {
      if (!body.userId || body.userId <= 0) return res.status(400).json({ error: "UserId can't be empty." });
      existing.userId = body.userId;
    }
    if (has("databaseName")) existing.databaseName = body.databaseName;
    if (has("tableName")) existing.tableName = body.tableName;
    if (has("fieldName")) existing.fieldName = body.fieldName;
    if (has("canRead")) existing.canRead = body.canRead;
    if (has("canWrite")) existing.canWrite = body.canWrite;
    if (has("isActive")) existing.isActive = body.isActive;
    if (has("grantedBy")) existing.grantedBy = body.grantedBy;

    await existing.save();
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /:id -> IUserDataAccessService21.Delete21
exports.remove = async (req, res) => {
  try {
    const existing = await UserDataAccess.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: `No UserDataAccess with Id ${req.params.id}.` });
    await existing.deleteOne();
    res.json({ success: true, id: req.params.id, message: "UserDataAccess grant deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
