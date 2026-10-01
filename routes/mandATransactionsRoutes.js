const express = require("express");
const router = express.Router();
const mandATransactionsController = require("../controllers/mandATransactionsController");

/**
 * @openapi
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - id
 *         - dealName
 *       properties:
 *         id:
 *           type: string
 *         dealName:
 *           type: string
 *         acquirer:
 *           type: string
 *         target:
 *           type: string
 *         year:
 *           type: string
 *         value:
 *           type: string
 *         type:
 *           type: string
 *           enum: [Acquisition, Merger, Divestiture]
 *         status:
 *           type: string
 *         description:
 *           type: string
 *     MandATransactions:
 *       type: object
 *       required:
 *         - installationId
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated MongoDB ObjectId
 *         installationId:
 *           type: string
 *           description: Ties this record to installationdefault.conf's installationId
 *         name:
 *           type: string
 *         subtitle:
 *           type: string
 *         position:
 *           type: string
 *         address1:
 *           type: string
 *         address2:
 *           type: string
 *         description:
 *           type: string
 *         transactions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Transaction'
 *         updatedBy:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         id: "67a1b2c3d4e5f6a7b8c9d0e1"
 *         installationId: "usc242"
 *         name: "John S. Stritzinger"
 *         subtitle: "Global Tech Executive"
 *         position: "Graduate Assistant - University of South Carolina"
 *         address1: "1800 Washington Street"
 *         address2: "Columbia, South Carolina 29201"
 *         description: "A record of mergers and acquisitions..."
 *         transactions:
 *           - id: "1"
 *             dealName: "Tech Innovations Acquisition"
 *             acquirer: "Global Tech Corp"
 *             target: "Innovation Labs Inc"
 *             year: "2024"
 *             value: "$50M"
 *             type: "Acquisition"
 *             status: "Completed"
 *             description: "Led technical due diligence and post-merger integration"
 *         updatedBy: "john"
 */

/**
 * @openapi
 * /matransactions:
 *   get:
 *     summary: Get all M&A transactions records
 *     tags:
 *       - MandATransactions
 *     responses:
 *       200:
 *         description: List of M&A transactions records (client filters by installationId)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MandATransactions'
 */
router.get("/", mandATransactionsController.getAllMandATransactions);

/**
 * @openapi
 * /matransactions/{id}:
 *   get:
 *     summary: Get a M&A transactions record by ID
 *     tags:
 *       - MandATransactions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: M&A transactions record ID
 *     responses:
 *       200:
 *         description: Record found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MandATransactions'
 *       404:
 *         description: Record not found
 */
router.get("/:id", mandATransactionsController.getMandATransactionsById);

/**
 * @openapi
 * /matransactions:
 *   post:
 *     summary: Create a new M&A transactions record
 *     tags:
 *       - MandATransactions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MandATransactions'
 *     responses:
 *       201:
 *         description: Record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MandATransactions'
 *       400:
 *         description: Invalid input
 */
router.post("/", mandATransactionsController.createMandATransactions);

/**
 * @openapi
 * /matransactions/{id}:
 *   put:
 *     summary: Update a M&A transactions record
 *     tags:
 *       - MandATransactions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: M&A transactions record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MandATransactions'
 *     responses:
 *       200:
 *         description: Record updated
 *       404:
 *         description: Record not found
 */
router.put("/:id", mandATransactionsController.updateMandATransactions);

/**
 * @openapi
 * /matransactions/{id}:
 *   delete:
 *     summary: Delete a M&A transactions record
 *     tags:
 *       - MandATransactions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: M&A transactions record ID
 *     responses:
 *       200:
 *         description: Record deleted
 *       404:
 *         description: Record not found
 */
router.delete("/:id", mandATransactionsController.deleteMandATransactions);

module.exports = router;
