const express = require("express");
const router = express.Router();
const NorthboundController = require("../controllers/northboundController");

/**
 * @swagger
 * tags:
 *   name: Northbound
 *   description: Aggregated API returning products, parks, and reviews
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NorthboundResponse:
 *       type: object
 *       properties:
 *         products:
 *           type: array
 *           items:
 *             type: object
 *         parks:
 *           type: array
 *           items:
 *             type: object
 *         parkReviews:
 *           type: array
 *           items:
 *             type: object
 *         productReviews:
 *           type: array
 *           items:
 *             type: object
 *       example:
 *         products:
 *           - name: "Tent"
 *             price: 99
 *             parkId: 101
 *         parks:
 *           - parkId: 101
 *             name: "Yellowstone"
 *             state: "WY"
 *         parkReviews:
 *           - uid: "user123"
 *             parkId: 101
 *             rating: 5
 *             review: "Amazing park!"
 *         productReviews:
 *           - uid: "user456"
 *             productId: "65f1a9c2e4b8c1a9d3f1b123"
 *             rating: 4
 *             review: "Great product"
 */

/**
 * @swagger
 * /northbound:
 *   get:
 *     summary: Get all products, parks, park reviews, and product reviews
 *     tags: [Northbound]
 *     responses:
 *       200:
 *         description: Aggregated northbound data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Northbound:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/NorthboundResponse'
 *       500:
 *         description: Server error
 */
router.get("/northbound", NorthboundController.getNorthbound);

module.exports = router;

