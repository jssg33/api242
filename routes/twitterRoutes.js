const express = require('express');
const router = express.Router();

const validateRequest = require('../middleware/validateRequest');
const { twitterRequestSchema } = require('../models/TwitterRequest');
const { createTwitterRequest } = require('../controllers/twitterRequestController');

/**
 * @swagger
 * components:
 *   schemas:
 *     TwitterRequest:
 *       type: object
 *       required:
 *         - userid
 *         - twittername
 *         - twitterpassword
 *         - requesttype
 *       properties:
 *         userid:
 *           type: string
 *           description: Internal user identifier
 *         twittername:
 *           type: string
 *           description: Twitter/X username
 *         twitterpassword:
 *           type: string
 *           description: Twitter/X password (store securely)
 *         requesttype:
 *           type: integer
 *           enum: [1, 2, 3, 4]
 *           description: 1=posts, 2=replies, 3=likes, 4=all
 *         processed:
 *           type: boolean
 *           default: false
 *           description: Whether the request has been processed
 *         processedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Timestamp when processed
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when request was created
 *
 *   responses:
 *     TwitterRequestCreated:
 *       description: Successfully created a Twitter request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TwitterRequest'
 */

/**
 * @swagger
 * /api/twitter/request:
 *   post:
 *     summary: Create a new Twitter request
 *     tags: [Twitter Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TwitterRequest'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/TwitterRequestCreated'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
    '/twitter/request',
    validateRequest(twitterRequestSchema),
    createTwitterRequest
);

module.exports = router;
