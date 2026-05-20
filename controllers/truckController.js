//truckController.js

const Truck = require("../models/Truck");

// GET all trucks
exports.getAllTrucks = async (req, res) => {
  try {
    const list = await Truck.find().lean();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET truck by ID
exports.getTruckById = async (req, res) => {
  try {
    const truck = await Truck.findById(req.params.id).lean();
    if (!truck) return res.status(404).json({ error: "Truck not found" });
    res.json(truck);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};

// CREATE truck
exports.createTruck = async (req, res) => {
  try {
    const truck = await Truck.create(req.body);
    res.status(201).json(truck);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE truck
exports.updateTruck = async (req, res) => {
  try {
    const truck = await Truck.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!truck) return res.status(404).json({ error: "Truck not found" });
    res.json(truck);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE truck
exports.deleteTruck = async (req, res) => {
  try {
    const truck = await Truck.findByIdAndDelete(req.params.id);
    if (!truck) return res.status(404).json({ error: "Truck not found" });
    res.json({ message: "Truck deleted" });
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};
