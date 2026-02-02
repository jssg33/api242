const DownloadLog = require("../models/downloadlog");

exports.getDownloadLogs = async (req, res) => {
  try {
    const logs = await DownloadLog.find().lean();
    res.json(logs);
  } catch {
    res.status(500).json({ error: "Failed to fetch download logs" });
  }
};

exports.createDownloadLog = async (req, res) => {
  try {
    const log = await DownloadLog.create(req.body);
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDownloadLogById = async (req, res) => {
  try {
    const log = await DownloadLog.findById(req.params.id).lean();
    if (!log) return res.status(404).json({ error: "Download log not found" });
    res.json(log);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};

exports.updateDownloadLog = async (req, res) => {
  try {
    const log = await DownloadLog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!log) return res.status(404).json({ error: "Download log not found" });
    res.json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteDownloadLog = async (req, res) => {
  try {
    const log = await DownloadLog.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ error: "Download log not found" });
    res.json({ message: "Download log deleted" });
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};
