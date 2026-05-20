//installerController.js

const Installer = require("../models/Installer");

// GET all installers
exports.getAllInstallers = async (req, res) => {
  try {
    const list = await Installer.find().lean();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET installer by ID
exports.getInstallerById = async (req, res) => {
  try {
    const installer = await Installer.findById(req.params.id).lean();
    if (!installer) return res.status(404).json({ error: "Installer not found" });
    res.json(installer);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};

// CREATE installer
exports.createInstaller = async (req, res) => {
  try {
    const installer = await Installer.create(req.body);
    res.status(201).json(installer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE installer
exports.updateInstaller = async (req, res) => {
  try {
    const installer = await Installer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!installer) return res.status(404).json({ error: "Installer not found" });
    res.json(installer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE installer
exports.deleteInstaller = async (req, res) => {
  try {
    const installer = await Installer.findByIdAndDelete(req.params.id);
    if (!installer) return res.status(404).json({ error: "Installer not found" });
    res.json({ message: "Installer deleted" });
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};
