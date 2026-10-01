const MandATransactions = require("../models/MandATransactions");

exports.getAllMandATransactions = async (req, res) => {
  try {
    const docs = await MandATransactions.find();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMandATransactionsById = async (req, res) => {
  try {
    const doc = await MandATransactions.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMandATransactions = async (req, res) => {
  try {
    const doc = await MandATransactions.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateMandATransactions = async (req, res) => {
  try {
    const doc = await MandATransactions.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteMandATransactions = async (req, res) => {
  try {
    const doc = await MandATransactions.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
