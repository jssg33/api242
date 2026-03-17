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
 *         userId:
 *           type: integer
 *         groupId:
 *           type: integer
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
 * /usergroups:
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
 */
router.post("/", userGroupController.createUserGroup);

/**
 * @swagger
 * /usergroups:
 *   get:
 *     summary: Get all UserGroup entries
 *     tags: [UserGroups]
 *     responses:
 *       200:
 *         description: List of UserGroups
 */
router.get("/", userGroupController.getAllUserGroups);

/**
 * @swagger
 * /usergroups/{id}:
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
 */
router.get("/:id", userGroupController.getUserGroupById);

/**
 * @swagger
 * /usergroups/{id}:
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
 */
router.put("/:id", userGroupController.updateUserGroup);

/**
 * @swagger
 * /usergroups/{id}:
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
 */
router.delete("/:id", userGroupController.deleteUserGroup);

/**
 * @swagger
 * /usergroups/user/{userId}:
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
 */
router.get("/user/:userId", userGroupController.getGroupsByUser);

/**
 * @swagger
 * /usergroups/group/{groupId}:
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
 */
router.get("/group/:groupId", userGroupController.getUsersByGroup);

module.exports = router;
