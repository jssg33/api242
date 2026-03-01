// controllers/ProjectController.js
const Project = require("../models/ProjectManager");

// Create a new project
exports.createProject = async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
};

// Get projects by user
exports.getProjectsByUser = async (req, res) => {
    const projects = await Project.find({ userid: req.params.userid });
    res.json(projects);
};

// Get projects by instance
exports.getProjectsByInstance = async (req, res) => {
    const projects = await Project.find({ instanceid: req.params.instanceid });
    res.json(projects);
};

// Get a single project
exports.getProjectById = async (req, res) => {
    const project = await Project.findById(req.params.id);
    res.json(project);
};

// Update a project
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a project
exports.deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: "Project deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
