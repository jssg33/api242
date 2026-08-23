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
 *         projectid:
 *           type: string
 *         groupid:
 *           type: string
 *         instanceid:
 *           type: string
 *         projectname:
 *           type: string
 *         description:
 *           type: string
 *         projectowner:
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
 *         mongoid:
 *           type: string
 *         logoUrl:
 *           type: string
 *         privacysetting:
 *           type: string
 */

/**
 * @swagger
 * /api/projects:
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
router.post("/", ProjectController.createProject);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get("/", ProjectController.getAllProjects);

/**
 * @swagger
 * /api/projects/user/{userid}:
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
router.get("/user/:userid", ProjectController.getProjectsByUser);

/**
 * @swagger
 * /api/projects/instance/{instanceid}:
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
router.get("/instance/:instanceid", ProjectController.getProjectsByInstance);

/**
 * @swagger
 * /api/projects/{projectid}:
 *   get:
 *     summary: Get a project by projectid
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: projectid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project data
 *       404:
 *         description: Project not found
 */
router.get("/:projectid", ProjectController.getProjectById);

/**
 * @swagger
 * /api/projects/{projectid}:
 *   put:
 *     summary: Update a project by projectid
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: projectid
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
 *       404:
 *         description: Project not found
 */
router.put("/:projectid", ProjectController.updateProject);

/**
 * @swagger
 * /api/projects/{projectid}:
 *   delete:
 *     summary: Delete a project by projectid
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: projectid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted
 *       404:
 *         description: Project not found
 */
router.delete("/:projectid", ProjectController.deleteProject);

/* ---------------------------------------------------------
   CRUD ROUTES USING CUSTOM mongoid FIELD
--------------------------------------------------------- */

/**
 * @swagger
 * /api/projects/mongo/{mongoid}:
 *   get:
 *     summary: Get a project by custom mongoid field
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: mongoid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project data
 *       404:
 *         description: Project not found
 */
router.get("/mongo/:mongoid", ProjectController.getProjectByMongoId);

/**
 * @swagger
 * /api/projects/mongo/{mongoid}:
 *   put:
 *     summary: Update a project by custom mongoid field
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: mongoid
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
 *       404:
 *         description: Project not found
 */
router.put("/mongo/:mongoid", ProjectController.updateProjectByMongoId);

/**
 * @swagger
 * /api/projects/mongo/{mongoid}:
 *   delete:
 *     summary: Delete a project by custom mongoid field
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: mongoid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted
 *       404:
 *         description: Project not found
 */
router.delete("/mongo/:mongoid", ProjectController.deleteProjectByMongoId);

module.exports = router;

