const express = require("express");
const router = express.Router();
const controller = require("../controllers/projectTaskController");

/**
 * @swagger
 * components:
 *   schemas:
 *     ProjectTask:
 *       type: object
 *       properties:
 *         name: { type: string }
 *         description: { type: string }
 *         url: { type: string }
 *         projectId: { type: string }
 *         customerId: { type: string }
 */

/**
 * @swagger
 * /projecttasks:
 *   get:
 *     summary: Get all project tasks
 *     tags: [ProjectTasks]
 *     responses:
 *       200:
 *         description: List of project tasks
 */
router.get("/", controller.getProjectTasks);

/**
 * @swagger
 * /projecttasks:
 *   post:
 *     summary: Create a new project task
 *     tags: [ProjectTasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectTask'
 *     responses:
 *       201:
 *         description: Project task created
 */
router.post("/", controller.createProjectTask);

module.exports = router;
