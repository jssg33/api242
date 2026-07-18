const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and CRUD operations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id: { type: number }
 *         userid: { type: number }
 *         useridstring: { type: string }
 *         uidstring: { type: string }
 *         firstname: { type: string }
 *         lastname: { type: string }
 *         fullname: { type: string }
 *         displayname: { type: string }
 *         username: { type: string }
 *         pronoun: { type: string }
 *         email:
 *           type: string
 *           format: email
 *         phone: { type: string }
 *         cellphone: { type: string }
 *         sms: { type: number }
 *         fax: { type: string }
 *         btnphone: { type: string }
 *         dateOfBirth: { type: string }
 *         maritalstatus: { type: string }
 *         address1: { type: string }
 *         address2: { type: string }
 *         city: { type: string }
 *         state: { type: string }
 *         postalzip: { type: string }
 *         country: { type: string }
 *         password: { type: string }
 *         plainpassword: { type: string }
 *         hashedpassword: { type: string }
 *         passwordtype: { type: number }
 *         resettoken: { type: string }
 *         resettokenexpiration:
 *           type: string
 *           format: date-time
 *         usertwofactorenabled: { type: boolean }
 *         usertwofactortype: { type: string }
 *         usertwofactorkeysmsdestination: { type: string }
 *         twofactorkeyemaildestination: { type: string }
 *         twofactorprovider: { type: string }
 *         twofactorprovidertoken: { type: string }
 *         twofactorproviderauthstring: { type: string }
 *         employee: { type: boolean }
 *         employeeid: { type: string }
 *         buid: { type: number }
 *         managerid: { type: number }
 *         regionid: { type: number }
 *         microsoftid: { type: string }
 *         ncrid: { type: string }
 *         oracleid: { type: string }
 *         azureid: { type: string }
 *         companyId: { type: string }
 *         companyid: { type: string }
 *         branchId: { type: string }
 *         branchid: { type: number }
 *         role:
 *           type: string
 *           enum: ["admin", "manager", "guest", "superuser", "registered", "systemadmin"]
 *         corporateuser: { type: string }
 *         status:
 *           type: string
 *           enum: ["active", "inactive", "pending"]
 *         university: { type: string }
 *         university1: { type: string }
 *         university2: { type: string }
 *         linkedinurl: { type: string }
 *         instagramurl: { type: string }
 *         vimeourl: { type: string }
 *         facebookurl: { type: string }
 *         googleurl: { type: string }
 *         publicprojectid: { type: string }
 *         jid: { type: number }
 *         btn: { type: string }
 *         iscertified: { type: boolean }
 *         activepictureurl: { type: string }
 *         defaultinstanceid: { type: string }
 *         defaultshardid: { type: string }
 *         cartMasterIndex: { type: number }
 *         userProfileIndex: { type: number }
 *       required:
 *         - fullname
 *         - email
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Failed to fetch users
 */
router.get("/", userController.getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 *       409:
 *         description: Email already exists
 *       400:
 *         description: Validation error
 */
router.post("/", userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid ID
 */
router.get("/:id", userController.getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found
 *       400:
 *         description: Validation error
 */
router.put("/:id", userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 *       400:
 *         description: Invalid ID
 */
router.delete("/:id", userController.deleteUser);

module.exports = router;
