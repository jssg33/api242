// Audit/controllers/siteaccesspermissions.controller.js — port of analyticsgen4rev2/Audit/siteaccesspermissions.controller.cs
// (SiteAccessPermissionsController). Model lives in apisiteaccesspermissions.model.js (file-base mismatch inherited from the C#).
const SiteAccessPermission = require("../models/apisiteaccesspermissions.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await SiteAccessPermission.find());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await SiteAccessPermission.findById(req.params.id);
    if (!item) return res.status(404).end();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    res.status(201).json(await SiteAccessPermission.create(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const existing = await SiteAccessPermission.findById(req.params.id);
    if (!existing) return res.status(404).end();

    const { userId, siteId, accessLevel, isEnabled, grantedBy, grantedDate, expirationDate, reviewedDate, reviewedBy } = req.body;
    Object.assign(existing, { userId, siteId, accessLevel, isEnabled, grantedBy, grantedDate, expirationDate, reviewedDate, reviewedBy });

    await existing.save();
    res.json(existing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const existing = await SiteAccessPermission.findById(req.params.id);
    if (!existing) return res.status(404).end();
    await existing.deleteOne();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
