const AdminLog = require('../models/AdminLog');

// GET all logs
exports.getAllAdminLogs = async (req, res) => {
  try {
    const logs = await AdminLog.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET log by numeric id (existing behavior)
exports.getAdminLogById = async (req, res) => {
  try {
    const log = await AdminLog.findOne({ id: req.params.id });
    if (!log) {
      return res.status(404).json({ message: 'Admin log not found' });
    }
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// NEW: GET log by mongoid
exports.getAdminLogByMongoId = async (req, res) => {
  try {
    const log = await AdminLog.findOne({ mongoid: req.params.mongoid });
    if (!log) {
      return res.status(404).json({ message: 'Admin log not found' });
    }
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create new log (existing)
exports.createAdminLog = async (req, res) => {
  try {
    const log = new AdminLog(req.body);
    const saved = await log.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// NEW: PUT update log by mongoid
exports.updateAdminLogByMongoId = async (req, res) => {
  try {
    const updated = await AdminLog.findOneAndUpdate(
      { mongoid: req.params.mongoid },
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Admin log not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

