const HomeContent = require("../models/HomeContent");

exports.getAllHomeContent = async (req, res) => {
  try {
    const docs = await HomeContent.find();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHomeContentById = async (req, res) => {
  try {
    const doc = await HomeContent.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createHomeContent = async (req, res) => {
  try {
    const doc = await HomeContent.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateHomeContent = async (req, res) => {
  try {
    const doc = await HomeContent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteHomeContent = async (req, res) => {
  try {
    const doc = await HomeContent.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
