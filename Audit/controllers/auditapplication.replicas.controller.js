// Audit/controllers/auditapplication.replicas.controller.js — port of
// analyticsgen4rev2/Audit/auditapplication.replicas.controller.cs (AuditApplicationReplicasController).
const AuditApplicationReplica = require("../models/auditapplication.replica.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await AuditApplicationReplica.find().sort({ _id: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await AuditApplicationReplica.findById(req.params.id);
    if (!item) return res.status(404).end();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByApplication = async (req, res) => {
  try {
    const items = await AuditApplicationReplica.find({ auditApplicationId: Number(req.params.applicationId) }).sort({ replicaName: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByShard = async (req, res) => {
  try {
    const items = await AuditApplicationReplica.find({ shardId: req.params.shardId }).sort({ replicaName: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByRegion = async (req, res) => {
  try {
    const items = await AuditApplicationReplica.find({ region: req.params.region }).sort({ replicaName: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const item = await AuditApplicationReplica.create({ ...req.body, createdDate: new Date() });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await AuditApplicationReplica.findById(req.params.id);
    if (!item) return res.status(404).end();

    const fields = [
      "auditApplicationId", "auditApplicationVersionId", "replicaName", "shardId", "region", "environmentName",
      "hostName", "serverName", "url", "ipAddress", "datacenterId", "vendorId", "status", "isProduction",
      "lastDeploymentDate", "lastHealthCheckDate", "ownerUserId", "notes", "isActive"
    ];
    for (const f of fields) if (f in req.body) item[f] = req.body[f];
    item.modifiedDate = new Date();

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await AuditApplicationReplica.findById(req.params.id);
    if (!item) return res.status(404).end();
    await item.deleteOne();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
