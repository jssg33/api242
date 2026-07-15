// controllers/keyController.js

const UserSession = require("../models/UserSession");
const KeyAssignment = require("../models/KeyAssignment");
const PkiLite = require("pki-lite"); // adapt to actual API

const pkiClient = new PkiLite({
  baseUrl: process.env.PKI_LITE_URL,
  apiKey: process.env.PKI_LITE_API_KEY
});

// Create + assign a key to a user session
exports.issueSessionKey = async (req, res) => {
  try {
    const { sessionId, alias } = req.body;

    const session = await UserSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.sessioncomplete === 1) {
      return res.status(400).json({ message: "Session is closed" });
    }

    const keyPair = await pkiClient.generateKeyPair({ alias });

    const assignment = await KeyAssignment.create({
      sessionId: session._id,
      keyId: keyPair.id,
      alias: keyPair.alias,
      publicKey: keyPair.publicKey
    });

    res.status(201).json({
      sessionId: session._id,
      keyId: assignment.keyId,
      alias: assignment.alias,
      publicKey: assignment.publicKey
    });
  } catch (err) {
    console.error("Error issuing key:", err);
    res.status(500).json({ message: "Failed to issue key" });
  }
};

// Retrieve keys for a session
exports.getSessionKeys = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await UserSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const keys = await KeyAssignment.find({ sessionId });

    res.json(keys);
  } catch (err) {
    console.error("Error fetching session keys:", err);
    res.status(500).json({ message: "Failed to fetch keys" });
  }
};
