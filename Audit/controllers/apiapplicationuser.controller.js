// Audit/controllers/apiapplicationuser.controller.js — port of analyticsgen4rev2/Audit/apiapplicationuser.controller.cs
// (ApiApplicationsAccessController).
const ApplicationUser = require("../models/apiapplicationuser.model");

// GET / -> 01GetAllApplicationAccess
exports.getAll = async (req, res) => {
  try {
    res.json(await ApplicationUser.find());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:id -> 01GetApplicationAccessById
exports.getById = async (req, res) => {
  try {
    const item = await ApplicationUser.findById(req.params.id);
    if (!item) return res.status(404).end();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /application/:applicationId -> 01GetApplicationAccessByApplication
exports.getByApplication = async (req, res) => {
  try {
    res.json(await ApplicationUser.find({ applicationId: req.params.applicationId }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /user/:userId -> 01GetApplicationAccessByUser
exports.getByUser = async (req, res) => {
  try {
    res.json(await ApplicationUser.find({ userId: req.params.userId }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / -> 01CreateApplicationAccess
exports.create = async (req, res) => {
  try {
    const item = await ApplicationUser.create({ ...req.body, createdDate: new Date() });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /:id -> 01UpdateApplicationAccess (only overwrites fields the caller actually sent, like the C#)
exports.update = async (req, res) => {
  try {
    const existing = await ApplicationUser.findById(req.params.id);
    if (!existing) return res.status(404).end();

    const body = req.body;
    existing.applicationId = body.applicationId;
    existing.userId = body.userId;
    if (body.permission != null) existing.permission = body.permission;
    if (body.roleName != null) existing.roleName = body.roleName;
    if (body.accessType != null) existing.accessType = body.accessType;
    if (body.approvalGroup != null) existing.approvalGroup = body.approvalGroup;
    if (body.reviewedBy != null) existing.reviewedBy = body.reviewedBy;
    if (body.requestTicket != null) existing.requestTicket = body.requestTicket;
    if (body.businessJustification != null) existing.businessJustification = body.businessJustification;
    existing.isActive = body.isActive;
    if (body.accessGrantedDate) existing.accessGrantedDate = body.accessGrantedDate;
    if (body.accessRemovedDate) existing.accessRemovedDate = body.accessRemovedDate;
    if (body.lastReviewedDate) existing.lastReviewedDate = body.lastReviewedDate;
    existing.modifiedDate = new Date();

    await existing.save();
    res.json(existing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /:id -> 01DeleteApplicationAccess
exports.remove = async (req, res) => {
  try {
    const existing = await ApplicationUser.findById(req.params.id);
    if (!existing) return res.status(404).end();
    await existing.deleteOne();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
