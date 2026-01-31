const Instance = require("../models/instance");

exports.getAllInstances = async (req, res) => {
  try {
    const instances = await Instance.find().populate("branchId");
    res.json(instances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInstanceById = async (req, res) => {
  try {
    const instance = await Instance.findById(req.params.id).populate("branchId");
    if (!instance) return res.status(404).json({ message: "Instance not found" });
    res.json(instance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createInstance = async (req, res) => {
  try {
    const instance = new Instance(req.body);
    await instance.save();
    res.status(201).json(instance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateInstance = async (req, res) => {
  try {
    const instance = await Instance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!instance) return res.status(404).json({ message: "Instance not found" });
    res.json(instance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteInstance = async (req, res) => {
  try {
    const instance = await Instance.findByIdAndDelete(req.params.id);
    if (!instance) return res.status(404).json({ message: "Instance not found" });
    res.json({ message: "Instance deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
