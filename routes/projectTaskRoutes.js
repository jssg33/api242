const express = require("express");
const router = express.Router();
const controller = require("../controllers/ProjectTaskController");

/**
 * @swagger
 * tags:
 *   name: ProjectTasks
 *   description: API for managing project tasks
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProjectTask:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The task name
 *         description:
 *           type: string
 *           description: Details about the task
 *         url:
 *           type: string
 *           description: Optional link related to the task
 *         projectId:
 *           type: string
 *           description: ID of the project this task belongs to
 *         customerId:
 *           type: string
 *           description: ID of the customer associated with this task
 *       example:
 *         name: "Design Homepage"
 *         description: "Create wireframes and mockups"
 *         url: "https://example.com/task"
 *         projectId: "P123"
 *         customerId: "C456"
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectTask'
 */
router.get("/", controller.getProjectTasks);

/**
 * @swagger
 * /projecttasks/{id}:
 *   get:
 *     summary: Get a project task by ID
 *     tags: [ProjectTasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single project task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectTask'
 *       404:
 *         description: Task not found
 */
router.get("/:id", controller.getProjectTaskById);

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

/**
 * @swagger
 * /projecttasks/{id}:
 *   put:
 *     summary: Update a project task
 *     tags: [ProjectTasks]
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
 *             $ref: '#/components/schemas/ProjectTask'
 *     responses:
 *       200:
 *         description: Project task updated
 *       404:
 *         description: Task not found
 */
router.put("/:id", controller.updateProjectTask);

/**
 * @swagger
 * /projecttasks/{id}:
 *   delete:
 *     summary: Delete a project task
 *     tags: [ProjectTasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project task deleted
 *       404:
 *         description: Task not found
 */
router.delete("/:id", controller.deleteProjectTask);

module.exports = router;
