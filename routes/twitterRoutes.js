const express = require('express');
const router = express.Router();
const controller = require('../controllers/twitterRequestController');

/**
 * @openapi
 * /api/twitterrequests:
 *   post:
 *     summary: Create a new Twitter deletion request
 *     tags:
 *       - Twitter Requests
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userid
 *               - twittername
 *               - requesttype
 *             properties:
 *               userid:
 *                 type: string
 *                 example: "1"
 *               twittername:
 *                 type: string
 *                 example: "stritzk"
 *               twitterpassword:
 *                 type: string
 *                 example: "mypassword"
 *               requesttype:
 *                 type: integer
 *                 enum: [1, 2, 3, 4, 5, 6]
 *                 example: 1
 *               oathstring:
 *                 type: string
 *                 example: "string"
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 */
router.post('/', controller.createTwitterRequest);

/**
 * @openapi
 * /api/twitterrequests:
 *   get:
 *     summary: Get all Twitter deletion requests
 *     tags:
 *       - Twitter Requests
 *     responses:
 *       200:
 *         description: List of requests
 */
router.get('/', controller.getAllTwitterRequests);

/**
 * @openapi
 * /api/twitterrequests/{id}:
 *   get:
 *     summary: Get a single Twitter deletion request by ID
 *     tags:
 *       - Twitter Requests
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
 *         description: Not Found
 */
router.get('/:id', controller.getTwitterRequestById);

/**
 * @openapi
 * /api/twitterrequests/{id}:
 *   put:
 *     summary: Update a Twitter deletion request
 *     tags:
 *       - Twitter Requests
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
 *             type: object
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Not Found
 */
router.put('/:id', controller.updateTwitterRequest);

/**
 * @openapi
 * /api/twitterrequests/{id}:
 *   delete:
 *     summary: Delete a Twitter deletion request
 *     tags:
 *       - Twitter Requests
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
 *         description: Not Found
 */
router.delete('/:id', controller.deleteTwitterRequest);

module.exports = router;
