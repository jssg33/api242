// controllers/UserProjectController.js
const UserProject = require('../models/UserProject');

exports.createUserProject = async (req, res) => {
  try {
    const project = await UserProject.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserProjects = async (req, res) => {
  try {
    const projects = await UserProject.find({ userId: req.params.userId });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUserProjects = async (req, res) => {
  try {
    const projects = await UserProject.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUserProject = async (req, res) => {
  try {
    const deleted = await UserProject.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Record not found" });
    res.json({ message: "User project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
