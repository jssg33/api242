// controllers/buildingController.js
const Building = require("../models/building");

// Create a building
exports.createBuilding = async (req, res) => {
  try {
    const building = new Building(req.body);
    const saved = await building.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all buildings
exports.getBuildings = async (req, res) => {
  try {
    const buildings = await Building.find();
    res.json(buildings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get building by ID
exports.getBuildingById = async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);
    if (!building) return res.status(404).json({ error: "Building not found" });
    res.json(building);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update building
exports.updateBuilding = async (req, res) => {
  try {
    const updated = await Building.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Building not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete building
exports.deleteBuilding = async (req, res) => {
  try {
    const deleted = await Building.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Building not found" });
    res.json({ message: "Building deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
