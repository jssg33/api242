const ApiLog = require('../models/ApiLog');

exports.getAllLogs = async (req, res) => {
  try {
    const logs = await ApiLog.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLogById = async (req, res) => {
  try {
    const log = await ApiLog.findOne({ id: req.params.id });
    if (!log) {
      return res.status(404).json({ message: 'Log not found' });
    }
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createLog = async (req, res) => {
  try {
    const log = new ApiLog(req.body);
    const saved = await log.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
