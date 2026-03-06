// routes/UserProjectRoutes.js
const express = require('express');
const router = express.Router();
const UserProjectController = require('../controllers/UserProjectController');

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProject:
 *       type: object
 *       required:
 *         - userId
 *         - projectId
 *         - projectName
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated ID
 *         userId:
 *           type: string
 *           description: ID of the user
 *         projectId:
 *           type: string
 *           description: ID of the project
 *         projectName:
 *           type: string
 *           description: Name of the project
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

/**
 * @swagger
 * /userprojects:
 *   get:
 *     summary: Get all user-project assignments
 *     tags: [UserProjects]
 *     responses:
 *       200:
 *         description: List of all user-project records
 */
router.get('/', UserProjectController.getAllUserProjects);

/**
 * @swagger
 * /userprojects/{userId}:
 *   get:
 *     summary: Get all projects assigned to a specific user
 *     tags: [UserProjects]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of projects for the user
 */
router.get('/:userId', UserProjectController.getUserProjects);

/**
 * @swagger
 * /userprojects:
 *   post:
 *     summary: Assign a project to a user
 *     tags: [UserProjects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProject'
 *     responses:
 *       201:
 *         description: User project created
 */
router.post('/', UserProjectController.createUserProject);

/**
 * @swagger
 * /userprojects/{id}:
 *   delete:
 *     summary: Delete a user-project assignment
 *     tags: [UserProjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User project deleted
 */
router.delete('/:id', UserProjectController.deleteUserProject);

module.exports = router;
