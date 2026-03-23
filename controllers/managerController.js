import Manager from "../models/Manager.js";

// GET all managers
export const getManagers = async (req, res) => {
  try {
    const managers = await Manager.find()
      .populate("manager")
      .populate("company")
      .populate("users")
      .populate("supervisorid");

    res.json(managers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET manager by ID
export const getManagerById = async (req, res) => {
  try {
    const manager = await Manager.findById(req.params.id)
      .populate("manager")
      .populate("company")
      .populate("users")
      .populate("supervisorid");

    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    res.json(manager);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE manager
export const createManager = async (req, res) => {
  try {
    const manager = await Manager.create(req.body);
    res.status(201).json(manager);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE manager
export const updateManager = async (req, res) => {
  try {
    const manager = await Manager.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    res.json(manager);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE manager
export const deleteManager = async (req, res) => {
  try {
    const manager = await Manager.findByIdAndDelete(req.params.id);

    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    res.json({ message: "Manager deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
