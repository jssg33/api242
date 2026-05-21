const InstallerManager = require("../models/InstallerManager");

// GET all installer managers
exports.getAllInstallerManagers = async (req, res) => {
  try {
    const list = await InstallerManager.find()
      .populate("assignedtruck")
      .populate("installerlist")
      .lean();

    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET installer manager by ID
exports.getInstallerManagerById = async (req, res) => {
  try {
    const manager = await InstallerManager.findById(req.params.id)
      .populate("assignedtruck")
      .populate("installerlist")
      .lean();

    if (!manager)
      return res.status(404).json({ error: "Installer Manager not found" });

    res.json(manager);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};

// CREATE installer manager
exports.createInstallerManager = async (req, res) => {
  try {
    const manager = await InstallerManager.create(req.body);
    res.status(201).json(manager);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE installer manager
exports.updateInstallerManager = async (req, res) => {
  try {
    const manager = await InstallerManager.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!manager)
      return res.status(404).json({ error: "Installer Manager not found" });

    res.json(manager);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE installer manager
exports.deleteInstallerManager = async (req, res) => {
  try {
    const manager = await InstallerManager.findByIdAndDelete(req.params.id);

    if (!manager)
      return res.status(404).json({ error: "Installer Manager not found" });

    res.json({ message: "Installer Manager deleted" });
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
};
