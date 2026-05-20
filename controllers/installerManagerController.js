// controllers/installerManagerController.js
const InstallerManager = require("../models/InstallerManager");

// GET all installer managers
exports.getAllInstallerManagers = async (req, res) => {
  try {
    const managers = await InstallerManager.find()
      .populate("assignedtruck")
      .populate("buid")
      .populate("ouid")
      .populate("installerlist");

    res.status(200).json(managers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single installer manager by ID
exports.getInstallerManagerById = async (req, res) => {
  try {
    const manager = await InstallerManager.findById(req.params.id)
      .populate("assignedtruck")
      .populate("buid")
      .populate("ouid")
      .populate("installerlist");

    if (!manager) {
      return res.status(404).json({ message: "Installer Manager not found" });
    }

    res.status(200).json(manager);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE new installer manager
exports.createInstallerManager = async (req, res) => {
  try {
    const manager = new InstallerManager(req.body);
    const savedManager = await manager.save();
    res.status(201).json(savedManager);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE installer manager
exports.updateInstallerManager = async (req, res) => {
  try {
    const updatedManager = await InstallerManager.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedManager) {
      return res.status(404).json({ message: "Installer Manager not found" });
    }

    res.status(200).json(updatedManager);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE installer manager
exports.deleteInstallerManager = async (req, res) => {
  try {
    const deletedManager = await InstallerManager.findByIdAndDelete(
      req.params.id
    );

    if (!deletedManager) {
      return res.status(404).json({ message: "Installer Manager not found" });
    }

    res.status(200).json({ message: "Installer Manager deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
