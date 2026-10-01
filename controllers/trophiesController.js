const Trophies = require("../models/Trophies");

exports.getAllTrophies = async (req, res) => {
  try {
    const docs = await Trophies.find();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTrophiesById = async (req, res) => {
  try {
    const doc = await Trophies.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTrophies = async (req, res) => {
  try {
    const doc = await Trophies.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTrophies = async (req, res) => {
  try {
    const doc = await Trophies.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTrophies = async (req, res) => {
  try {
    const doc = await Trophies.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
