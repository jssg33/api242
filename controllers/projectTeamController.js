const ProjectTeamMember = require("../models/ProjectTeamMember");

exports.getAllProjectTeamMembers = async (req, res) => {
  try {
    const docs = await ProjectTeamMember.find();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectTeamMemberById = async (req, res) => {
  try {
    const doc = await ProjectTeamMember.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectTeamMembersByProject = async (req, res) => {
  try {
    const docs = await ProjectTeamMember.find({ projectId: req.params.projectId });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProjectTeamMember = async (req, res) => {
  try {
    const doc = await ProjectTeamMember.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProjectTeamMember = async (req, res) => {
  try {
    const doc = await ProjectTeamMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProjectTeamMember = async (req, res) => {
  try {
    const doc = await ProjectTeamMember.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
