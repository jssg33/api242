const express = require("express");
const router = express.Router();
const refundController = require("../controllers/refundController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Refund:
 *       type: object
 *       required:
 *         - refundId
 *         - bookingId
 *         - paymentMethod
 *         - amountPaid
 *         - amountRefunded
 *         - paymentDate
 *         - transactionId
 *       properties:
 *         refundId:
 *           type: number
 *         bookingId:
 *           type: number
 *         paymentMethod:
 *           type: string
 *         cardType:
 *           type: string
 *         cardLast4:
 *           type: string
 *         cardExpDate:
 *           type: string
 *         amountPaid:
 *           type: number
 *         amountRefunded:
 *           type: number
 *         paymentDate:
 *           type: string
 *         transactionId:
 *           type: string
 *         refundTransactionId:
 *           type: string
 *         useridasstring:
 *           type: string
 *         transtype:
 *           type: string
 *         fullname:
 *           type: string
 *         parkName:
 *           type: string
 *         state:
 *           type: string
 *         parkId:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /refunds:
 *   get:
 *     tags: [Refunds]
 *     summary: Get all refunds
 *     responses:
 *       200:
 *         description: List of refunds
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Refund"
 */
router.get("/", refundController.getRefunds);

/**
 * @swagger
 * /refunds:
 *   post:
 *     tags: [Refunds]
 *     summary: Create a new refund record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Refund"
 *     responses:
 *       201:
 *         description: Refund created
 */
router.post("/", refundController.createRefund);

/**
 * @swagger
 * /refunds/{id}:
 *   get:
 *     tags: [Refunds]
 *     summary: Get a refund by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Refund found
 *       404:
 *         description: Refund not found
 */
router.get("/:id", refundController.getRefundById);

/**
 * @swagger
 * /refunds/{id}:
 *   put:
 *     tags: [Refunds]
 *     summary: Update a refund record
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
 *             $ref: "#/components/schemas/Refund"
 *     responses:
 *       200:
 *         description: Refund updated
 *       404:
 *         description: Refund not found
 */
router.put("/:id", refundController.updateRefund);

/**
 * @swagger
 * /refunds/{id}:
 *   delete:
 *     tags: [Refunds]
 *     summary: Delete a refund record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Refund deleted
 *       404:
 *         description: Refund not found
 */
router.delete("/:id", refundController.deleteRefund);

/**
 * @swagger
 * /refunds/booking/{bookingId}:
 *   get:
 *     tags: [Refunds]
 *     summary: Get refunds by booking ID
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Refunds for the booking
 */
router.get("/booking/:bookingId", refundController.getRefundsByBooking);

/**
 * @swagger
 * /refunds/transaction/{transactionId}:
 *   get:
 *     tags: [Refunds]
 *     summary: Get refunds by transaction ID
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Refunds for the transaction
 */
router.get("/transaction/:transactionId", refundController.getRefundsByTransaction);

module.exports = router;
