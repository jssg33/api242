const express = require("express");
const router = express.Router();
const { numberParam, objectIdParam } = require("../middleware/validateParams");
router.param("id", objectIdParam);
router.param("projectId", numberParam);
router.param("userId", numberParam);
const controller = require("../controllers/projectMilestoneController");

/**
 * @swagger
 * tags:
 *   name: ProjectMilestones
 *   description: Manage project milestones
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProjectMilestone:
 *       type: object
 *       required:
 *         - projectId
 *         - title
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB ObjectId
 *         projectId:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         dueDate:
 *           type: string
 *           format: date-time
 *         completed:
 *           type: boolean
 *         completedAt:
 *           type: string
 *           format: date-time
 *         assignedTo:
 *           type: integer
 *         status:
 *           type: string
 *           enum: [pending, in-progress, completed, delayed]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
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
 */

/**
 * @swagger
 * /projectmilestones:
 *   post:
 *     summary: Create a new milestone
 *     tags: [ProjectMilestones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectMilestone'
 *     responses:
 *       201:
 *         description: Milestone created
 */
router.post("/", controller.createMilestone);

/**
 * @swagger
 * /projectmilestones:
 *   get:
 *     summary: Get all milestones
 *     tags: [ProjectMilestones]
 *     responses:
 *       200:
 *         description: List of milestones
 */
router.get("/", controller.getAllMilestones);

/**
 * @swagger
 * /projectmilestones/{id}:
 *   get:
 *     summary: Get milestone by ID
 *     tags: [ProjectMilestones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Milestone found
 *       404:
 *         description: Not found
 */
router.get("/:id", controller.getMilestoneById);

/**
 * @swagger
 * /projectmilestones/{id}:
 *   put:
 *     summary: Update a milestone
 *     tags: [ProjectMilestones]
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
 *             $ref: '#/components/schemas/ProjectMilestone'
 *     responses:
 *       200:
 *         description: Milestone updated
 */
router.put("/:id", controller.updateMilestone);

/**
 * @swagger
 * /projectmilestones/{id}:
 *   delete:
 *     summary: Delete a milestone
 *     tags: [ProjectMilestones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Milestone deleted
 */
router.delete("/:id", controller.deleteMilestone);

/**
 * @swagger
 * /projectmilestones/project/{projectId}:
 *   get:
 *     summary: Get milestones for a project
 *     tags: [ProjectMilestones]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Milestones for the project
 */
router.get("/project/:projectId", controller.getMilestonesByProject);

/**
 * @swagger
 * /projectmilestones/user/{userId}:
 *   get:
 *     summary: Get milestones assigned to a user
 *     tags: [ProjectMilestones]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Milestones assigned to the user
 */
router.get("/user/:userId", controller.getMilestonesByUser);

module.exports = router;
