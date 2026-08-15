const UserDevice = require("../models/userDevice");

// CREATE
exports.createDevice = async (req, res) => {
  try {
    const device = new UserDevice(req.body);
    const saved = await device.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL
exports.getAllDevices = async (req, res) => {
  try {
    const items = await UserDevice.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ BY USER ID
exports.getDevicesByUser = async (req, res) => {
  try {
    const items = await UserDevice.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ BY DEVICE ID
exports.getDeviceById = async (req, res) => {
  try {
    const item = await UserDevice.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateDevice = async (req, res) => {
  try {
    const updated = await UserDevice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteDevice = async (req, res) => {
  try {
    const deleted = await UserDevice.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
