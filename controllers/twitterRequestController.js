// controllers/twitterRequestController.js

const TwitterRequest = require('../models/TwitterRequest');

exports.createTwitterRequest = async (req, res) => {
    try {
        const { userid, twittername, twitterpassword, requesttype } = req.body;

        const newRequest = new TwitterRequest({
            userid,
            twittername,
            twitterpassword,
            requesttype,
            processed: false,
            processedAt: null
        });

        const saved = await newRequest.save();

        res.status(201).json({
            message: "Request stored successfully",
            data: saved
        });

    } catch (error) {
        console.error("MongoDB Insert Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
