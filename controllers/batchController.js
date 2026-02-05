const Batch = require('../models/Batch');

exports.getAllBatches = async (req, res) => {
  try {
    const batches = await Batch.find();
    res.json(batches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBatchById = async (req, res) => {
  try {
    const batch = await Batch.findOne({ id: req.params.id });
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }
    res.json(batch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBatch = async (req, res) => {
  try {
    const batch = new Batch(req.body);
    const saved = await batch.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
