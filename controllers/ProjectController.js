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

// Get a single project by projectid
exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findOne({
            projectid: req.params.projectid
        });

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a project by projectid
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findOneAndUpdate(
            { projectid: req.params.projectid },
            req.body,
            { new: true }
        );

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a project by projectid
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({
            projectid: req.params.projectid
        });

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.json({ message: "Project deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// -----------------------------
// CRUD by custom mongoid field
// -----------------------------

// Get project by mongoid
exports.getProjectByMongoId = async (req, res) => {
    try {
        const project = await Project.findOne({
            mongoid: req.params.mongoid
        });

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update project by mongoid
exports.updateProjectByMongoId = async (req, res) => {
    try {
        const project = await Project.findOneAndUpdate(
            { mongoid: req.params.mongoid },
            req.body,
            { new: true }
        );

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete project by mongoid
exports.deleteProjectByMongoId = async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({
            mongoid: req.params.mongoid
        });

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.json({ message: "Project deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
