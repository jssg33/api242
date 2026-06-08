const express = require('express');
const router = express.Router();
const TwitterRequest = require('../models/TwitterRequest');
const TwitterManager = require('../controllers/twitterManager'); // adjust path

const twitterManager = new TwitterManager(); // using hardcoded token for now

// POST: Create a new deletion request (queue it)
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
