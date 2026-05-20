//(organizationUnitController.js)

const OrganizationUnit = require("../models/OrganizationUnit");

// GET all OUs
exports.getAllOrganizationUnits = async (req, res) => {
  try {
    const list = await OrganizationUnit.find().lean();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET OU by ID
exports.getOrganizationUnitById = async (req, res) => {
  try {
    const ou = await OrganizationUnit.findById(req.params.id).lean();
    if (!ou) return res.status(404).json({ error: "Organization Unit not found" });
    res.json(ou);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};

// CREATE OU
exports.createOrganizationUnit = async (req, res) => {
  try {
    const ou = await OrganizationUnit.create(req.body);
    res.status(201).json(ou);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE OU
exports.updateOrganizationUnit = async (req, res) => {
  try {
    const ou = await OrganizationUnit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!ou) return res.status(404).json({ error: "Organization Unit not found" });

    res.json(ou);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE OU
exports.deleteOrganizationUnit = async (req, res) => {
  try {
    const ou = await OrganizationUnit.findByIdAndDelete(req.params.id);
    if (!ou) return res.status(404).json({ error: "Organization Unit not found" });

    res.json({ message: "Organization Unit deleted" });
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};
