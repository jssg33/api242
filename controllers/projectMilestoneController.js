// controllers/projectMilestoneController.js
const ProjectMilestone = require("../models/ProjectMilestones");

exports.createMilestone = async (req, res) => {
  try {
    const milestone = await ProjectMilestone.create(req.body);
    res.status(201).json(milestone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllMilestones = async (req, res) => {
  try {
    const milestones = await ProjectMilestone.find().lean();
    res.status(200).json(milestones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMilestoneById = async (req, res) => {
  try {
    const milestone = await ProjectMilestone.findById(req.params.id).lean();
    if (!milestone) {
      return res.status(404).json({ error: "Milestone not found" });
    }
    res.status(200).json(milestone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMilestone = async (req, res) => {
  try {
    const updated = await ProjectMilestone.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) {
      return res.status(404).json({ error: "Milestone not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMilestone = async (req, res) => {
  try {
    const deleted = await ProjectMilestone.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Milestone not found" });
    }
    res.status(200).json({ message: "Milestone deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMilestonesByProject = async (req, res) => {
  try {
    const milestones = await ProjectMilestone.find({
      projectId: Number(req.params.projectId)
    }).lean();
    res.status(200).json(milestones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMilestonesByUser = async (req, res) => {
  try {
    const milestones = await ProjectMilestone.find({
      assignedTo: Number(req.params.userId)
    }).lean();
    res.status(200).json(milestones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
