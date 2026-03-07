const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/ProjectController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - userid
 *         - instanceid
 *         - projectname
 *         - githubRepoUrl
 *       properties:
 *         userid:
 *           type: string
 *         instanceid:
 *           type: string
 *         projectname:
 *           type: string
 *         githubRepoUrl:
 *           type: string
 *         githubPagesUrl:
 *           type: string
 *         hostingProviderName:
 *           type: string
 *         hostingProviderUrl:
 *           type: string
 *         account:
 *           type: string
 *         subaccount:
 *           type: string
 *         companyid:
 *           type: string
 */

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Project created
 */
router.post("/projects", ProjectController.createProject);

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get("/projects", ProjectController.getAllProjects);

/**
 * @swagger
 * /projects/user/{userid}:
 *   get:
 *     summary: Get projects by user ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of projects for the user
 */
router.get("/projects/user/:userid", ProjectController.getProjectsByUser);

/**
 * @swagger
 * /projects/instance/{instanceid}:
 *   get:
 *     summary: Get projects by instance ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: instanceid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of projects for the instance
 */
router.get("/projects/instance/:instanceid", ProjectController.getProjectsByInstance);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project data
 */
router.get("/projects/:id", ProjectController.getProjectById);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update a project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Updated project
 */
router.put("/projects/:id", ProjectController.updateProject);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted
 */
router.delete("/projects/:id", ProjectController.deleteProject);

module.exports = router;
