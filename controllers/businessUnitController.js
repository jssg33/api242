//businessUnitController.js
const BusinessUnit = require("../models/BusinessUnit");

// GET all BUs
exports.getAllBusinessUnits = async (req, res) => {
  try {
    const list = await BusinessUnit.find().lean();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET BU by ID
exports.getBusinessUnitById = async (req, res) => {
  try {
    const bu = await BusinessUnit.findById(req.params.id).lean();
    if (!bu) return res.status(404).json({ error: "Business Unit not found" });
    res.json(bu);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};

// CREATE BU
exports.createBusinessUnit = async (req, res) => {
  try {
    const bu = await BusinessUnit.create(req.body);
    res.status(201).json(bu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE BU
exports.updateBusinessUnit = async (req, res) => {
  try {
    const bu = await BusinessUnit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!bu) return res.status(404).json({ error: "Business Unit not found" });

    res.json(bu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE BU
exports.deleteBusinessUnit = async (req, res) => {
  try {
    const bu = await BusinessUnit.findByIdAndDelete(req.params.id);
    if (!bu) return res.status(404).json({ error: "Business Unit not found" });

    res.json({ message: "Business Unit deleted" });
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};
