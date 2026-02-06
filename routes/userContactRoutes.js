const express = require("express");
const router = express.Router();
const controller = require("../controllers/userContactsController");

/**
 * @swagger
 * components:
 *   schemas:
 *     UserContact:
 *       type: object
 *       required:
 *         - phone
 *         - email
 *         - address1
 *         - city
 *         - state
 *         - zip
 *         - country
 *       properties:
 *         phone:
 *           type: string
 *           example: "555-123-4567"
 *         email:
 *           type: string
 *           example: "user@example.com"
 *         address1:
 *           type: string
 *           example: "123 Main St"
 *         address2:
 *           type: string
 *           example: "Apt 4B"
 *         city:
 *           type: string
 *           example: "Columbia"
 *         state:
 *           type: string
 *           example: "SC"
 *         zip:
 *           type: string
 *           example: "29201"
 *         country:
 *           type: string
 *           example: "USA"
 *         fax:
 *           type: string
 *           example: "555-987-6543"
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

/**
 * @swagger
 * /usercontacts:
 *   get:
 *     tags: [UserContacts]
 *     summary: Get all user contacts
 *     responses:
 *       200:
 *         description: List of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/UserContact"
 *
 *   post:
 *     tags: [UserContacts]
 *     summary: Create a new user contact entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserContact"
 *     responses:
 *       201:
 *         description: Contact created
 */

/**
 * @swagger
 * /usercontacts/{id}:
 *   get:
 *     tags: [UserContacts]
 *     summary: Get a contact by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact found
 *       404:
 *         description: Not found
 *
 *   put:
 *     tags: [UserContacts]
 *     summary: Update a contact entry
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
 *             $ref: "#/components/schemas/UserContact"
 *     responses:
 *       200:
 *         description: Contact updated
 *
 *   delete:
 *     tags: [UserContacts]
 *     summary: Delete a contact entry
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted
 */

// ---------------- EXPRESS ROUTES ----------------

router.post("/", controller.createContact);
router.get("/", controller.getContacts);
router.get("/:id", controller.getContactById);
router.put("/:id", controller.updateContact);
router.delete("/:id", controller.deleteContact);

module.exports = router;
