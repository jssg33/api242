const AdminLog = require('../models/AdminLog');

exports.getAllAdminLogs = async (req, res) => {
  try {
    const logs = await AdminLog.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

exports.createAdminLog = async (req, res) => {
  try {
    const log = new AdminLog(req.body);
    const saved = await log.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
