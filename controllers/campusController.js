const Campus = require("../models/campus");

// GET all campuses
exports.getCampuses = async (req, res) => {
  try {
    const campuses = await Campus.find();
    res.json(campuses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET campus by ID
exports.getCampusById = async (req, res) => {
  try {
    const campus = await Campus.findById(req.params.id);
    if (!campus) return res.status(404).json({ error: "Campus not found" });
    res.json(campus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE campus
exports.createCampus = async (req, res) => {
  try {
    const campus = new Campus(req.body);
    await campus.save();
    res.status(201).json(campus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE campus
exports.updateCampus = async (req, res) => {
  try {
    const campus = await Campus.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!campus) return res.status(404).json({ error: "Campus not found" });
    res.json(campus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE campus
exports.deleteCampus = async (req, res) => {
  try {
    const campus = await Campus.findByIdAndDelete(req.params.id);
    if (!campus) return res.status(404).json({ error: "Campus not found" });
    res.json({ message: "Campus deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
