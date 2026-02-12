const express = require("express");
const router = express.Router();
const controller = require("../controllers/userHelpController");

/**
 * @swagger
 * components:
 *   schemas:
 *     UserHelp:
 *       type: object
 *       required:
 *         - ticketid
 *         - emplid
 *         - descr
 *         - severity
 *         - userid
 *         - email
 *         - fullname
 *         - bestcontactnumber
 *         - ticketdate
 *         - ticketstatus
 *       properties:
 *         ticketid:
 *           type: string
 *           example: "TCK-1001"
 *         emplid:
 *           type: number
 *           example: 12345
 *         descr:
 *           type: string
 *           example: "Unable to log into system"
 *         severity:
 *           type: number
 *           example: 2
 *         userid:
 *           type: number
 *           example: 789
 *         email:
 *           type: string
 *           example: "user@example.com"
 *         fullname:
 *           type: string
 *           example: "John Doe"
 *         bestcontactnumber:
 *           type: string
 *           example: "555-123-4567"
 *         replied:
 *           type: string
 *           example: "Yes"
 *         repliedmanagerid:
 *           type: string
 *           example: "MGR-001"
 *         repliedmanagerphone:
 *           type: string
 *           example: "555-987-6543"
 *         repliedmanageremail:
 *           type: string
 *           example: "manager@example.com"
 *         ticketdate:
 *           type: string
 *           format: date-time
 *           example: "2026-02-06T14:33:00.564Z"
 *         responsedate:
 *           type: string
 *           format: date-time
 *           example: "2026-02-06T15:00:00.000Z"
 *         ticketstatus:
 *           type: string
 *           example: "Open"
 */

/**
 * @swagger
 * /userhelp:
 *   get:
 *     tags: [UserHelp]
 *     summary: Get all user help tickets
 *     responses:
 *       200:
 *         description: List of tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/UserHelp"
 *
 *   post:
 *     tags: [UserHelp]
 *     summary: Create a new user help ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserHelp"
 *     responses:
 *       201:
 *         description: Ticket created
 */

/**
 * @swagger
 * /userhelp/{id}:
 *   get:
 *     tags: [UserHelp]
 *     summary: Get a ticket by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket found
 *       404:
 *         description: Not found
 *
 *   put:
 *     tags: [UserHelp]
 *     summary: Update a ticket
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
 *             $ref: "#/components/schemas/UserHelp"
 *     responses:
 *       200:
 *         description: Ticket updated
 *
 *   delete:
 *     tags: [UserHelp]
 *     summary: Delete a ticket
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket deleted
 */

// ---------------- EXPRESS ROUTES ----------------

router.post("/", controller.createTicket);
router.get("/", controller.getTickets);
router.get("/:id", controller.getTicketById);
router.put("/:id", controller.updateTicket);
router.delete("/:id", controller.deleteTicket);

module.exports = router;
