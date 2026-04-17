const LicenseLog = require("../models/licenselog");

// ------------------------------------------------------
// ORIGINAL ENDPOINTS (UNCHANGED)
// ------------------------------------------------------

// Get all logs
exports.getLicenseLogs = async (req, res) => {
  try {
    const logs = await LicenseLog.find().lean();
    res.json(logs);
  } catch {
    res.status(500).json({ error: "Failed to fetch license logs" });
  }
};

// Create a log
exports.createLicenseLog = async (req, res) => {
  try {
    const log = await LicenseLog.create(req.body);
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get log by ID
exports.getLicenseLogById = async (req, res) => {
  try {
    const log = await LicenseLog.findById(req.params.id).lean();
    if (!log) return res.status(404).json({ error: "Log not found" });
    res.json(log);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};

// Update log by ID
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

// Delete log by ID
exports.deleteLicenseLog = async (req, res) => {
  try {
    const log = await LicenseLog.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ error: "Log not found" });
    res.json({ message: "Log deleted" });
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};

// ------------------------------------------------------
// NEW MONGOID CRUD ENDPOINTS
// ------------------------------------------------------

// Get ALL logs by mongoid
exports.getLicenseLogsByMongoId = async (req, res) => {
  try {
    const logs = await LicenseLog.find({ mongoid: req.params.mongoid }).lean();

    if (!logs || logs.length === 0) {
      return res.status(404).json({ error: "No logs found for this mongoid" });
    }

    res.json(logs);
  } catch {
    res.status(500).json({ error: "Failed to fetch logs by mongoid" });
  }
};

// Get ONE log by mongoid
exports.getLicenseLogByMongoId = async (req, res) => {
  try {
    const log = await LicenseLog.findOne({ mongoid: req.params.mongoid }).lean();

    if (!log) {
      return res.status(404).json({ error: "Log not found" });
    }

    res.json(log);
  } catch {
    res.status(500).json({ error: "Failed to fetch log by mongoid" });
  }
};

// Update log by mongoid
exports.updateLicenseLogByMongoId = async (req, res) => {
  try {
    const updated = await LicenseLog.findOneAndUpdate(
      { mongoid: req.params.mongoid },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Log not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete log by mongoid
exports.deleteLicenseLogByMongoId = async (req, res) => {
  try {
    const deleted = await LicenseLog.findOneAndDelete({ mongoid: req.params.mongoid });

    if (!deleted) {
      return res.status(404).json({ error: "Log not found" });
    }

    res.json({ message: "Log deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete log by mongoid" });
  }
};

// ------------------------------------------------------
// EXISTING FILTERED ENDPOINTS (UNCHANGED)
// ------------------------------------------------------

// Get logs by user ID
exports.getLogsByUser = async (req, res) => {
  try {
    const logs = await LicenseLog.find({ userid: req.params.userid }).lean();
    res.json(logs);
  } catch {
    res.status(500).json({ error: "Failed to fetch logs for user" });
  }
};

// Get logs by group ID
exports.getLogsByGroup = async (req, res) => {
  try {
    const logs = await LicenseLog.find({ groupid: req.params.groupid }).lean();
    res.json(logs);
  } catch {
    res.status(500).json({ error: "Failed to fetch logs for group" });
  }
};

// Get logs by company ID
exports.getLogsByCompany = async (req, res) => {
  try {
    const logs = await LicenseLog.find({ companyid: req.params.companyid }).lean();
    res.json(logs);
  } catch {
    res.status(500).json({ error: "Failed to fetch logs for company" });
  }
};

// Get logs by manager ID
exports.getLogsByManager = async (req, res) => {
  try {
    const logs = await LicenseLog.find({ managerid: req.params.managerid }).lean();
    res.json(logs);
  } catch {
    res.status(500).json({ error: "Failed to fetch logs for manager" });
  }
};

