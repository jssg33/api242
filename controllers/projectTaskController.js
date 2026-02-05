const ProjectTask = require("../models/ProjectTask");

// GET all project tasks
exports.getAllProjectTasks = async (req, res) => {
  try {
    const tasks = await ProjectTask.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a single project task by ID
exports.getProjectTaskById = async (req, res) => {
  try {
    const task = await ProjectTask.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Project task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE a new project task
exports.createProjectTask = async (req, res) => {
  try {
    const task = new ProjectTask(req.body);
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE a project task
exports.updateProjectTask = async (req, res) => {
  try {
    const updated = await ProjectTask.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Project task not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE a project task
exports.deleteProjectTask = async (req, res) => {
  try {
    const deleted = await ProjectTask.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Project task not found" });

    res.json({ message: "Project task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
