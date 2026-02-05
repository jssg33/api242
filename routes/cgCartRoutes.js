const express = require("express");
const router = express.Router();
const dto = require("../dtos/cgCartDto");

/**
 * @swagger
 * components:
 *   schemas:
 *     CGCartPark:
 *       type: object
 *       properties:
 *         id: { type: string }
 *         parkName: { type: string }
 *         location: { type: string }
 *         description: { type: string }
 *         adultPrice: { type: number }
 *         childPrice: { type: number }
 *         imageUrl: { type: string }
 *         reviews:
 *           type: array
 *           items: { type: string }

 *     CGCartItem:
 *       type: object
 *       properties:
 *         park:
 *           $ref: '#/components/schemas/CGCartPark'
 *         numAdults: { type: number }
 *         numChildren: { type: number }
 *         numDays: { type: number }
 *         resStart: { type: string }
 *         resEnd: { type: string }
 *         totalPrice: { type: number }

 *     CGCart:
 *       type: object
 *       properties:
 *         userId: { type: number }
 *         uid: { type: string }
 *         transactionTotal: { type: number }
 *         paymentId: { type: string }
 *         resStart: { type: string }
 *         resEnd: { type: string }
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CGCartItem'
 *         useremail: { type: string }
 *         parkId: { type: number }
 */

/**
 * @swagger
 * /api/CGCART:
 *   post:
 *     summary: Accepts a full CGCart DTO from the web client
 *     tags: [CGCART]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CGCart'
 *     responses:
 *       201:
 *         description: CGCart DTO stored successfully
 */
router.post("/", dto.postCGCart);

module.exports = router;
