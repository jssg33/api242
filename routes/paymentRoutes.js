const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - paymentId
 *         - bookingId
 *         - paymentMethod
 *         - amountPaid
 *         - paymentDate
 *         - transactionId
 *         - userid
 *       properties:
 *         paymentId:
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
 *         paymentDate:
 *           type: string
 *         transactionId:
 *           type: string
 *         useridasstring:
 *           type: string
 *         transtype:
 *           type: string
 *         refundTransactionId:
 *           type: string
 *         amountRefunded:
 *           type: number
 *         fullname:
 *           type: string
 *         userid:
 *           type: number
 *         possource:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /payments:
 *   get:
 *     tags: [Payments]
 *     summary: Get all payments
 *     responses:
 *       200:
 *         description: List of payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Payment"
 */
router.get("/", paymentController.getPayments);

/**
 * @swagger
 * /payments:
 *   post:
 *     tags: [Payments]
 *     summary: Create a new payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Payment"
 *     responses:
 *       201:
 *         description: Payment created
 */
router.post("/", paymentController.createPayment);

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     tags: [Payments]
 *     summary: Get a payment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment found
 *       404:
 *         description: Payment not found
 */
router.get("/:id", paymentController.getPaymentById);

/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     tags: [Payments]
 *     summary: Update a payment
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
 *             $ref: "#/components/schemas/Payment"
 *     responses:
 *       200:
 *         description: Payment updated
 *       404:
 *         description: Payment not found
 */
router.put("/:id", paymentController.updatePayment);

/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     tags: [Payments]
 *     summary: Delete a payment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment deleted
 *       404:
 *         description: Payment not found
 */
router.delete("/:id", paymentController.deletePayment);

/**
 * @swagger
 * /payments/user/{userid}:
 *   get:
 *     tags: [Payments]
 *     summary: Get all payments for a specific user
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Payments for the user
 */
router.get("/user/:userid", paymentController.getPaymentsByUser);

/**
 * @swagger
 * /payments/booking/{bookingId}:
 *   get:
 *     tags: [Payments]
 *     summary: Get payments by booking ID
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Payments for the booking
 */
router.get("/booking/:bookingId", paymentController.getPaymentsByBooking);

/**
 * @swagger
 * /payments/transaction/{transactionId}:
 *   get:
 *     tags: [Payments]
 *     summary: Get payments by transaction ID
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payments for the transaction
 */
router.get("/transaction/:transactionId", paymentController.getPaymentsByTransaction);

module.exports = router;

