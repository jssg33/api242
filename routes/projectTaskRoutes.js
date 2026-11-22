const express = require("express");
const router = express.Router();
const { objectIdParam } = require("../middleware/validateParams");
router.param("id", objectIdParam);
const controller = require("../controllers/ProjectTasksController");

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
 *         description:
 *           type: string
 *         url:
 *           type: string
 *         projectId:
 *           type: string
 *         customerId:
 *           type: string
 *         InsertDate:
 *           type: string
 *           format: date-time
 *           description: Set once when the record is created
 *         LastUpdateDate:
 *           type: string
 *           format: date-time
 *           description: Refreshed on every update
 *         SoftDeleteDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Null until the record is soft-deleted
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
