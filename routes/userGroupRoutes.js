const express = require("express");
const router = express.Router();
const userGroupController = require("../controllers/userGroupController");

/**
 * @swagger
 * tags:
 *   name: UserGroups
 *   description: Manage user-group relationships
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserGroup:
 *       type: object
 *       required:
 *         - userId
 *         - groupId
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         userId:
 *           type: integer
 *           description: ID of the user
 *         groupId:
 *           type: integer
 *           description: ID of the group
 *         role:
 *           type: string
 *           default: member
 *         status:
 *           type: string
 *           default: active
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/user-groups:
 *   post:
 *     summary: Create a new UserGroup entry
 *     tags: [UserGroups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserGroup'
 *     responses:
 *       201:
 *         description: UserGroup created successfully
 *       500:
 *         description: Server error
 */
router.post("/", userGroupController.createUserGroup);

/**
 * @swagger
 * /api/user-groups:
 *   get:
 *     summary: Get all UserGroup entries
 *     tags: [UserGroups]
 *     responses:
 *       200:
 *         description: List of UserGroups
 *       500:
 *         description: Server error
 */
router.get("/", userGroupController.getAllUserGroups);

/**
 * @swagger
 * /api/user-groups/{id}:
 *   get:
 *     summary: Get a UserGroup by ID
 *     tags: [UserGroups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: UserGroup found
 *       404:
 *         description: UserGroup not found
 *       500:
 *         description: Server error
 */
router.get("/:id", userGroupController.getUserGroupById);

/**
 * @swagger
 * /api/user-groups/{id}:
 *   put:
 *     summary: Update a UserGroup entry
 *     tags: [UserGroups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserGroup'
 *     responses:
 *       200:
 *         description: UserGroup updated
 *       404:
 *         description: UserGroup not found
 *       500:
 *         description: Server error
 */
router.put("/:id", userGroupController.updateUserGroup);

/**
 * @swagger
 * /api/user-groups/{id}:
 *   delete:
 *     summary: Delete a UserGroup entry
 *     tags: [UserGroups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: UserGroup deleted
 *       404:
 *         description: UserGroup not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", userGroupController.deleteUserGroup);

/**
 * @swagger
 * /api/user-groups/user/{userId}:
 *   get:
 *     summary: Get all groups for a specific user
 *     tags: [UserGroups]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of groups for the user
 *       500:
 *         description: Server error
 */
router.get("/user/:userId", userGroupController.getGroupsByUser);

/**
 * @swagger
 * /api/user-groups/group/{groupId}:
 *   get:
 *     summary: Get all users in a specific group
 *     tags: [UserGroups]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of users in the group
 *       500:
 *         description: Server error
 */
router.get("/group/:groupId", userGroupController.getUsersByGroup);

module.exports = router;
