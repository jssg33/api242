const License = require("../models/license");

exports.getLicenses = async (req, res) => {
  try {
    const licenses = await License.find().lean();
    res.json(licenses);
  } catch {
    res.status(500).json({ error: "Failed to fetch licenses" });
  }
};

exports.createLicense = async (req, res) => {
  try {
    const license = await License.create(req.body);
    res.status(201).json(license);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "License ID already exists" });
    }
    res.status(400).json({ error: err.message });
  }
};

exports.getLicenseById = async (req, res) => {
  try {
    const license = await License.findById(req.params.id).lean();
    if (!license) return res.status(404).json({ error: "License not found" });
    res.json(license);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};

exports.updateLicense = async (req, res) => {
  try {
    const license = await License.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!license) return res.status(404).json({ error: "License not found" });
    res.json(license);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteLicense = async (req, res) => {
  try {
    const license = await License.findByIdAndDelete(req.params.id);
    if (!license) return res.status(404).json({ error: "License not found" });
    res.json({ message: "License deleted" });
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};
