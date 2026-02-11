const UserSession = require("../models/UserSession");

// GET all sessions
exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await UserSession.find();
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET session by ID
exports.getSessionById = async (req, res) => {
  try {
    const session = await UserSession.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE session
exports.createSession = async (req, res) => {
  try {
    const session = new UserSession(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE session
exports.updateSession = async (req, res) => {
  try {
    const session = await UserSession.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE session
exports.deleteSession = async (req, res) => {
  try {
    const session = await UserSession.findByIdAndDelete(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json({ message: "Session deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
