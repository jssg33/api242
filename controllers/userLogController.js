const UserLog = require("../models/userlog");

// -----------------------------
// GET by Mongo _id
// -----------------------------
exports.getById = async (req, res) => {
  try {
    const log = await UserLog.findById(req.params.id);
    if (!log) return res.status(404).json({ message: "UserLog not found" });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------
// GET by uid
// -----------------------------
exports.getByUid = async (req, res) => {
  try {
    const logs = await UserLog.find({ uid: req.params.uid });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------
// GET by mongoid (your custom field)
// -----------------------------
exports.getByMongoId = async (req, res) => {
  try {
    const logs = await UserLog.find({ mongoid: req.params.mongoid });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------
// CREATE (POST)
// -----------------------------
exports.createLog = async (req, res) => {
  try {
    const log = new UserLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// -----------------------------
// UPDATE by Mongo _id
// -----------------------------
exports.updateById = async (req, res) => {
  try {
    const log = await UserLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!log) return res.status(404).json({ message: "UserLog not found" });
    res.json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// -----------------------------
// UPDATE by uid
// -----------------------------
exports.updateByUid = async (req, res) => {
  try {
    const log = await UserLog.findOneAndUpdate(
      { uid: req.params.uid },
      req.body,
      { new: true }
    );
    if (!log) return res.status(404).json({ message: "UserLog not found" });
    res.json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// -----------------------------
// UPDATE by mongoid (custom field)
// -----------------------------
exports.updateByMongoId = async (req, res) => {
  try {
    const log = await UserLog.findOneAndUpdate(
      { mongoid: req.params.mongoid },
      req.body,
      { new: true }
    );
    if (!log) return res.status(404).json({ message: "UserLog not found" });
    res.json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// -----------------------------
// GET ALL USER LOGS
// -----------------------------
exports.getAll = async (req, res) => {
  try {
    const logs = await UserLog.find();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  
