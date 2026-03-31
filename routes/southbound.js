const express = require("express");
const router = express.Router();
const SouthboundController = require("../controllers/SouthboundController");

/**
 * @swagger
 * tags:
 *   name: Southbound
 *   description: Accepts a multiplexed cart and demultiplexes it into DB collections
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SouthboundCart:
 *       type: object
 *       properties:
 *         payments:
 *           type: array
 *           items:
 *             type: object
 *         cards:
 *           type: array
 *           items:
 *             type: object
 *         invoices:
 *           type: array
 *           items:
 *             type: object
 *         invoiceLineItems:
 *           type: array
 *           items:
 *             type: object
 *         reservations:
 *           type: array
 *           items:
 *             type: object
 *       example:
 *         payments:
 *           - paymentId: 5001
 *             bookingId: 200
 *             paymentMethod: "credit"
 *             amountPaid: 49.99
 *             paymentDate: "2025-03-01T10:22:00Z"
 *             transactionId: "TXN-ABC-123"
 *             userid: 55
 *         cards:
 *           - cardId: 1001
 *             uid: "user123"
 *             cardType: "credit"
 *             cardVendor: "Visa"
 *             cardLast4: "4242"
 *             cardExpDate: "12/26"
 *             billingZip: "29201"
 *             fullname: "John Doe"
 *             fullcardnumber: "4111111111111111"
 *             userid: 55
 *         invoices:
 *           - invoiceId: 9001
 *             customerId: "CUST-100"
 *             accountId: "ACCT-200"
 *             subAccountId: "SUB-300"
 *             subtotal: 50
 *             taxTotal: 5
 *             grandTotal: 55
 *             invoiceDate: "2025-03-01"
 *         invoiceLineItems:
 *           - invoiceId: 9001
 *             productId: "65f1a9c2e4b8c1a9d3f1b123"
 *             description: "Camping Tent"
 *             quantity: 1
 *             unitCost: 50
 *             lineTotal: 50
 *         reservations:
 *           - reservationId: 7001
 *             parkId: 101
 *             userid: 55
 */

/**
 * @swagger
 * /southbound:
 *   post:
 *     summary: Submit a multiplexed cart (payments, cards, invoices, invoiceLineItems, reservations)
 *     tags: [Southbound]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SouthboundCart'
 *     responses:
 *       200:
 *         description: Cart processed successfully and demultiplexed into collections
 *       500:
 *         description: Server error
 */
router.post("/southbound", SouthboundController.processSouthboundCart);

module.exports = router;
