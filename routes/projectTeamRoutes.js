const express = require("express");
const router = express.Router();
const projectTeamController = require("../controllers/projectTeamController");

/**
 * @openapi
 * components:
 *   schemas:
 *     ProjectTeamMember:
 *       type: object
 *       required:
 *         - projectId
 *         - name
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated MongoDB ObjectId
 *         projectId:
 *           type: string
 *           description: The 8-digit project id this member belongs to
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         role:
 *           type: string
 *           enum: [developer, project-manager, stakeholder]
 *         type:
 *           type: string
 *           description: Stakeholder sub-type only (Marketing, Finance, HR, etc.)
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: "67a1b2c3d4e5f6a7b8c9d0e1"
 *         projectId: "24200101"
 *         name: "Jordan Blake"
 *         email: "jordan.blake@example.com"
 *         phone: "555-010-2001"
 *         role: "project-manager"
 *         type: ""
 */

/**
 * @openapi
 * /projectteam:
 *   get:
 *     summary: Get all project team members
 *     tags:
 *       - ProjectTeam
 *     responses:
 *       200:
 *         description: List of team members (client filters by projectId)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectTeamMember'
 */
router.get("/", projectTeamController.getAllProjectTeamMembers);

/**
 * @openapi
 * /projectteam/project/{projectId}:
 *   get:
 *     summary: Get team members for a specific project
 *     tags:
 *       - ProjectTeam
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Team members for the project
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectTeamMember'
 */
router.get("/project/:projectId", projectTeamController.getProjectTeamMembersByProject);

/**
 * @openapi
 * /projectteam/{id}:
 *   get:
 *     summary: Get a team member by ID
 *     tags:
 *       - ProjectTeam
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Team member ID
 *     responses:
 *       200:
 *         description: Team member found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectTeamMember'
 *       404:
 *         description: Team member not found
 */
router.get("/:id", projectTeamController.getProjectTeamMemberById);

/**
 * @openapi
 * /projectteam:
 *   post:
 *     summary: Add a team member to a project
 *     tags:
 *       - ProjectTeam
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectTeamMember'
 *     responses:
 *       201:
 *         description: Team member created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectTeamMember'
 *       400:
 *         description: Invalid input
 */
router.post("/", projectTeamController.createProjectTeamMember);

/**
 * @openapi
 * /projectteam/{id}:
 *   put:
 *     summary: Update a team member
 *     tags:
 *       - ProjectTeam
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Team member ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectTeamMember'
 *     responses:
 *       200:
 *         description: Team member updated
 *       404:
 *         description: Team member not found
 */
router.put("/:id", projectTeamController.updateProjectTeamMember);

/**
 * @openapi
 * /projectteam/{id}:
 *   delete:
 *     summary: Remove a team member
 *     tags:
 *       - ProjectTeam
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Team member ID
 *     responses:
 *       200:
 *         description: Team member deleted
 *       404:
 *         description: Team member not found
 */
router.delete("/:id", projectTeamController.deleteProjectTeamMember);

module.exports = router;
