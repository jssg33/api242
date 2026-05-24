const express = require('express');
const router = express.Router();
const validateRequest = require('../middleware/validateRequest');
const { twitterRequestSchema } = require('../models/twitterRequestModel');

router.post('/twitter/request', validateRequest(twitterRequestSchema), (req, res) => {
    const { userid, twittername, twitterpassword, requesttype } = req.body;

    // Your logic here
    res.json({
        message: "Request received",
        data: { userid, twittername, requesttype }
    });
});

module.exports = router;
