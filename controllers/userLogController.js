const UserLog = require('../models/UserLog');

// GET all logs
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await UserLog.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET log by ID
exports.getLogById = async (req, res) => {
  try {
    const log = await UserLog.findOne({ id: req.params.id });
    if (!log) return res.status(404).json({ message: "Log not found" });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE log
exports.createLog = async (req, res) => {
  try {
    const newLog = new UserLog(req.body);
    await newLog.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE log
exports.updateLog = async (req, res) => {
  try {
    const updated = await UserLog.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Log not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE log
exports.deleteLog = async (req, res) => {
  try {
    const deleted = await UserLog.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ message: "Log not found" });
    res.json({ message: "Log deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
