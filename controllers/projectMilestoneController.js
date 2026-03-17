// controllers/projectMilestoneController.js
const { ProjectMilestone, Project, User } = require("../models");

exports.createMilestone = async (req, res) => {
  try {
    const milestone = await ProjectMilestone.create(req.body);
    res.status(201).json(milestone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllMilestones = async (req, res) => {
  try {
    const milestones = await ProjectMilestone.findAll({
      include: [
        { model: Project, as: "project" },
        { model: User, as: "assignedUser" }
      ],
    });
    res.status(200).json(milestones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMilestoneById = async (req, res) => {
  try {
    const milestone = await ProjectMilestone.findByPk(req.params.id, {
      include: [
        { model: Project, as: "project" },
        { model: User, as: "assignedUser" }
      ],
    });

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
    const { id } = req.params;

    const [updated] = await ProjectMilestone.update(req.body, {
      where: { id },
    });

    if (!updated) {
      return res.status(404).json({ error: "Milestone not found" });
    }

    const updatedMilestone = await ProjectMilestone.findByPk(id);
    res.status(200).json(updatedMilestone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMilestone = async (req, res) => {
  try {
    const deleted = await ProjectMilestone.destroy({
      where: { id: req.params.id },
    });

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
    const milestones = await ProjectMilestone.findAll({
      where: { projectId: req.params.projectId },
      include: [
        { model: Project, as: "project" },
        { model: User, as: "assignedUser" }
      ],
    });

    res.status(200).json(milestones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMilestonesByUser = async (req, res) => {
  try {
    const milestones = await ProjectMilestone.findAll({
      where: { assignedTo: req.params.userId },
      include: [
        { model: Project, as: "project" },
        { model: User, as: "assignedUser" }
      ],
    });

    res.status(200).json(milestones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
