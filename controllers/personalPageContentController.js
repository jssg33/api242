const PersonalPageContent = require("../models/PersonalPageContent");

exports.getAllPersonalPageContent = async (req, res) => {
  try {
    const docs = await PersonalPageContent.find();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPersonalPageContentByKey = async (req, res) => {
  try {
    const doc = await PersonalPageContent.findOne({ pageKey: req.params.pageKey });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPersonalPageContent = async (req, res) => {
  try {
    const doc = await PersonalPageContent.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePersonalPageContent = async (req, res) => {
  try {
    const doc = await PersonalPageContent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePersonalPageContent = async (req, res) => {
  try {
    const doc = await PersonalPageContent.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
