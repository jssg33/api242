const UserNotice = require('../models/UserNotice');

// -----------------------------------------------------
// ORIGINAL ENDPOINTS (UNCHANGED)
// -----------------------------------------------------

// GET all notices
exports.getAllNotices = async (req, res) => {
  try {
    const notices = await UserNotice.find();
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET notice by ID
exports.getNoticeById = async (req, res) => {
  try {
    const notice = await UserNotice.findOne({ id: req.params.id });
    if (!notice) return res.status(404).json({ message: "Notice not found" });
    res.json(notice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE notice
exports.createNotice = async (req, res) => {
  try {
    const newNotice = new UserNotice(req.body);
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE notice by ID
exports.updateNotice = async (req, res) => {
  try {
    const updated = await UserNotice.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Notice not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE notice by ID
exports.deleteNotice = async (req, res) => {
  try {
    const deleted = await UserNotice.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ message: "Notice not found" });
    res.json({ message: "Notice deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------------------------------
// NEW MONGOID-BASED ENDPOINTS
// -----------------------------------------------------

// GET all notices by mongoid
exports.getNoticesByMongoId = async (req, res) => {
  try {
    const notices = await UserNotice.find({ mongoid: req.params.mongoid });
    if (!notices || notices.length === 0)
      return res.status(404).json({ message: "No notices found for this mongoid" });

    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single notice by mongoid
exports.getNoticeByMongoId = async (req, res) => {
  try {
    const notice = await UserNotice.findOne({ mongoid: req.params.mongoid });
    if (!notice)
      return res.status(404).json({ message: "Notice not found" });

    res.json(notice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE notice by mongoid
exports.updateNoticeByMongoId = async (req, res) => {
  try {
    const updated = await UserNotice.findOneAndUpdate(
      { mongoid: req.params.mongoid },
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Notice not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE notice by mongoid
exports.deleteNoticeByMongoId = async (req, res) => {
  try {
    const deleted = await UserNotice.findOneAndDelete({ mongoid: req.params.mongoid });

    if (!deleted)
      return res.status(404).json({ message: "Notice not found" });

    res.json({ message: "Notice deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
