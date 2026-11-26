// Audit/controllers/apiaccesspermissions.controller.js
// Node port of analyticsgen4rev2/Audit/apiaccesspermissions.controller.cs (ApiAccessPermissionsController).
const ApiAccessPermission = require("../models/apiaccesspermissions.model");

// GET / -> 01GetApiAccessPermissions
exports.getAll = async (req, res) => {
  try {
    res.json(await ApiAccessPermission.find());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:id -> 02GetApiAccessPermission
exports.getById = async (req, res) => {
  try {
    const item = await ApiAccessPermission.findById(req.params.id);
    if (!item) return res.status(404).end();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / -> 03CreateApiAccessPermission
exports.create = async (req, res) => {
  try {
    res.status(201).json(await ApiAccessPermission.create(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /:id -> 04UpdateApiAccessPermission
exports.update = async (req, res) => {
  try {
    const existing = await ApiAccessPermission.findById(req.params.id);
    if (!existing) return res.status(404).end();

    const { userId, apiId, permissionLevel, isEnabled, grantedBy } = req.body;
    Object.assign(existing, { userId, apiId, permissionLevel, isEnabled, grantedBy });

    await existing.save();
    res.json(existing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /:id -> 05DeleteApiAccessPermission
exports.remove = async (req, res) => {
  try {
    const existing = await ApiAccessPermission.findById(req.params.id);
    if (!existing) return res.status(404).end();
    await existing.deleteOne();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
