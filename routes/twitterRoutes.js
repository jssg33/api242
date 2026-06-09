const express = require('express');
const router = express.Router();
const controller = require('../controllers/twitterRequestController');

/**
 * @openapi
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
 *         twittername:
 *           type: string
 *         twitterpassword:
 *           type: string
 *         requesttype:
 *           type: number
 *           enum: [1, 2, 3, 4]
 *         oathstring:
 *           type: string
 *           nullable: true
 *         processed:
 *           type: boolean
 *         processedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @openapi
 * /twitter-requests:
 *   post:
 *     summary: Create a new Twitter request
 *     tags: [TwitterRequest]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TwitterRequest'
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', controller.createTwitterRequest);

/**
 * @openapi
 * /twitter-requests:
 *   get:
 *     summary: Get all Twitter requests
 *     tags: [TwitterRequest]
 *     responses:
 *       200:
 *         description: List of all Twitter requests
 */
router.get('/', controller.getAllTwitterRequests);

/**
 * @openapi
 * /twitter-requests/{id}:
 *   get:
 *     summary: Get a Twitter request by ID
 *     tags: [TwitterRequest]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Found
 *       404:
 *         description: Not found
 */
router.get('/:id', controller.getTwitterRequestById);

/**
 * @openapi
 * /twitter-requests/{id}:
 *   put:
 *     summary: Update a Twitter request
 *     tags: [TwitterRequest]
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
 *             $ref: '#/components/schemas/TwitterRequest'
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.updateTwitterRequest);

/**
 * @openapi
 * /twitter-requests/{id}:
 *   delete:
 *     summary: Delete a Twitter request
 *     tags: [TwitterRequest]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.delete('/:id', controller.deleteTwitterRequest);

module.exports = router;
