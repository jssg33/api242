const express = require('express');
const router = express.Router();
const { objectIdParam } = require("../middleware/validateParams");
router.param("id", objectIdParam);
const TwitterRequest = require('../models/TwitterRequest');
const TwitterManager = require('../controllers/twitterClient'); // adjust path

const twitterManager = new TwitterManager(); // using hardcoded token for now

/**
 * @swagger
 * tags:
 *   name: TwitterDelete
 *   description: Queue and process Twitter/X content deletion requests
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TwitterRequest:
 *       type: object
 *       required:
 *         - userid
 *         - twittername
 *         - requesttype
 *       properties:
 *         _id:
 *           type: string
 *         userid:
 *           type: string
 *         twittername:
 *           type: string
 *         twitterpassword:
 *           type: string
 *           format: password
 *           writeOnly: true
 *         requesttype:
 *           type: integer
 *           enum: [1, 2, 3, 4, 5, 6]
 *         oathstring:
 *           type: string
 *         processed:
 *           type: boolean
 *           default: false
 *         processedAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         InsertDate:
 *           type: string
 *           format: date-time
 *           description: Set once when the record is created
 *         LastUpdateDate:
 *           type: string
 *           format: date-time
 *           description: Refreshed on every update
 *         SoftDeleteDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Null until the record is soft-deleted
 *     TwitterRequestCreate:
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
 *           format: password
 *         requesttype:
 *           type: integer
 *           enum: [1, 2, 3, 4, 5, 6]
 */

// POST: Create a new deletion request (queue it)
/**
 * @swagger
 * /api/twitterdelete/request:
 *   post:
 *     summary: Queue a new Twitter deletion request
 *     tags: [TwitterDelete]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TwitterRequestCreate'
 *     responses:
 *       201:
 *         description: Request queued
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 requestId:
 *                   type: string
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/request', async (req, res) => {
  try {
    const { userid, twittername, twitterpassword, requesttype } = req.body;

    if (!userid || !twittername || !twitterpassword || !requesttype) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newRequest = new TwitterRequest({
      userid,
      twittername,
      twitterpassword,
      requesttype,
      processed: false
    });

    await newRequest.save();

    res.status(201).json({
      message: 'Request queued successfully',
      requestId: newRequest._id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Get all requests for a user
/**
 * @swagger
 * /api/twitterdelete/requests/{userid}:
 *   get:
 *     summary: Get all deletion requests for a user (newest first)
 *     tags: [TwitterDelete]
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TwitterRequest'
 *       500:
 *         description: Server error
 */
router.get('/requests/:userid', async (req, res) => {
  try {
    const requests = await TwitterRequest.find({ userid: req.params.userid })
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Get single request
/**
 * @swagger
 * /api/twitterdelete/request/{id}:
 *   get:
 *     summary: Get a single deletion request
 *     tags: [TwitterDelete]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: TwitterRequest ObjectId
 *     responses:
 *       200:
 *         description: Request found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TwitterRequest'
 *       404:
 *         description: Request not found
 *       500:
 *         description: Server error
 */
router.get('/request/:id', async (req, res) => {
  try {
    const request = await TwitterRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ error: 'Request not found' });
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Process a specific request (Worker / Manual trigger)
/**
 * @swagger
 * /api/twitterdelete/process/{id}:
 *   post:
 *     summary: Process a specific deletion request
 *     tags: [TwitterDelete]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: TwitterRequest ObjectId
 *     responses:
 *       200:
 *         description: Request processed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 result:
 *                   type: object
 *       400:
 *         description: Already processed
 *       404:
 *         description: Request not found
 *       500:
 *         description: Server error
 */
router.post('/process/:id', async (req, res) => {
  try {
    const request = await TwitterRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ error: 'Request not found' });
    if (request.processed) return res.status(400).json({ error: 'Already processed' });

    const result = await twitterManager.processRequest(request);

    // Mark as processed
    request.processed = true;
    request.processedAt = new Date();
    await request.save();

    res.json({
      message: 'Request processed successfully',
      result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Optional: Process all pending requests (for background worker)
/**
 * @swagger
 * /api/twitterdelete/process-pending:
 *   post:
 *     summary: Process all pending deletion requests
 *     tags: [TwitterDelete]
 *     responses:
 *       200:
 *         description: Processing summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 processed:
 *                   type: integer
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       requestId:
 *                         type: string
 *                       status:
 *                         type: string
 *                         enum: [success, failed]
 *                       result:
 *                         type: object
 *                       error:
 *                         type: string
 *       500:
 *         description: Server error
 */
router.post('/process-pending', async (req, res) => {
  try {
    const pending = await TwitterRequest.find({ processed: false });
    const results = [];

    for (const req of pending) {
      try {
        const result = await twitterManager.processRequest(req);
        req.processed = true;
        req.processedAt = new Date();
        await req.save();
        results.push({ requestId: req._id, status: 'success', result });
      } catch (err) {
        results.push({ requestId: req._id, status: 'failed', error: err.message });
      }
    }

    res.json({ processed: results.length, details: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
