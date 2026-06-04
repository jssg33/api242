const Beacon = require('../models/beacon');

// GET all beacons
exports.getBeacons = async (req, res) => {
  try {
    const beacons = await Beacon.find();
    res.json(beacons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET beacon by ID
exports.getBeaconById = async (req, res) => {
  try {
    const beacon = await Beacon.findById(req.params.id);
    if (!beacon) return res.status(404).json({ error: 'Beacon not found' });
    res.json(beacon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE beacon
exports.createBeacon = async (req, res) => {
  try {
    const beacon = new Beacon(req.body);
    await beacon.save();
    res.status(201).json(beacon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE beacon
exports.updateBeacon = async (req, res) => {
  try {
    const beacon = await Beacon.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!beacon) return res.status(404).json({ error: 'Beacon not found' });
    res.json(beacon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE beacon
exports.deleteBeacon = async (req, res) => {
  try {
    const beacon = await Beacon.findByIdAndDelete(req.params.id);
    if (!beacon) return res.status(404).json({ error: 'Beacon not found' });
    res.json({ message: 'Beacon deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
