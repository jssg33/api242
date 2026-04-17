const License = require("../models/license");

// -----------------------------------------------------
// ORIGINAL ENDPOINTS (UNCHANGED)
// -----------------------------------------------------

// Get all licenses
exports.getLicenses = async (req, res) => {
  try {
    const licenses = await License.find().lean();
    res.json(licenses);
  } catch {
    res.status(500).json({ error: "Failed to fetch licenses" });
  }
};

// Create a new license
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

// Get license by MongoDB _id
exports.getLicenseById = async (req, res) => {
  try {
    const license = await License.findById(req.params.id).lean();
    if (!license) return res.status(404).json({ error: "License not found" });
    res.json(license);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};

// Update license by ID
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

// Delete license by ID
exports.deleteLicense = async (req, res) => {
  try {
    const license = await License.findByIdAndDelete(req.params.id);
    if (!license) return res.status(404).json({ error: "License not found" });
    res.json({ message: "License deleted" });
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};

// -----------------------------------------------------
// NEW MONGOID-BASED ENDPOINTS
// -----------------------------------------------------

// Get ALL licenses by mongoid
exports.getLicensesByMongoId = async (req, res) => {
  try {
    const licenses = await License.find({ mongoid: req.params.mongoid }).lean();

    if (!licenses || licenses.length === 0) {
      return res.status(404).json({ error: "No licenses found for this mongoid" });
    }

    res.json(licenses);
  } catch {
    res.status(500).json({ error: "Failed to fetch licenses by mongoid" });
  }
};

// Get ONE license by mongoid
exports.getLicenseByMongoId = async (req, res) => {
  try {
    const license = await License.findOne({ mongoid: req.params.mongoid }).lean();

    if (!license) {
      return res.status(404).json({ error: "License not found" });
    }

    res.json(license);
  } catch {
    res.status(500).json({ error: "Failed to fetch license by mongoid" });
  }
};

// Update license by mongoid
exports.updateLicenseByMongoId = async (req, res) => {
  try {
    const updated = await License.findOneAndUpdate(
      { mongoid: req.params.mongoid },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "License not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete license by mongoid
exports.deleteLicenseByMongoId = async (req, res) => {
  try {
    const deleted = await License.findOneAndDelete({ mongoid: req.params.mongoid });

    if (!deleted) {
      return res.status(404).json({ error: "License not found" });
    }

    res.json({ message: "License deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete license by mongoid" });
  }
};

// -----------------------------------------------------
// EXISTING FILTERED ENDPOINTS (UNCHANGED)
// -----------------------------------------------------

// Get licenses by user ID
exports.getLicensesByUser = async (req, res) => {
  try {
    const licenses = await License.find({ userid: req.params.userid }).lean();
    res.json(licenses);
  } catch {
    res.status(500).json({ error: "Failed to fetch licenses for user" });
  }
};

// Get licenses by customer/company ID
exports.getLicensesByCustomer = async (req, res) => {
  try {
    const licenses = await License.find({ customerid: req.params.customerid }).lean();
    res.json(licenses);
  } catch {
    res.status(500).json({ error: "Failed to fetch licenses for customer" });
  }
};

// Get licenses by group ID
exports.getLicensesByGroup = async (req, res) => {
  try {
    const licenses = await License.find({ groupid: req.params.groupid }).lean();
    res.json(licenses);
  } catch {
    res.status(500).json({ error: "Failed to fetch licenses for group" });
  }
};

