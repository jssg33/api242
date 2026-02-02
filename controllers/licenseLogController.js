const LicenseLog = require("../models/licenselog");

exports.getLicenseLogs = async (req, res) => {
  try {
    const logs = await LicenseLog.find().lean();
    res.json(logs);
  } catch {
    res.status(500).json({ error: "Failed to fetch license logs" });
  }
};

exports.createLicenseLog = async (req, res) => {
  try {
    const log = await LicenseLog.create(req.body);
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getLicenseLogById = async (req, res) => {
  try {
    const log = await LicenseLog.findById(req.params.id).lean();
    if (!log) return res.status(404).json({ error: "Log not found" });
    res.json(log);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};

exports.updateLicenseLog = async (req, res) => {
  try {
    const log = await LicenseLog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!log) return res.status(404).json({ error: "Log not found" });
    res.json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteLicenseLog = async (req, res) => {
  try {
    const log = await LicenseLog.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ error: "Log not found" });
    res.json({ message: "Log deleted" });
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};
