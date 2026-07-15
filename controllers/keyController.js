// controllers/keyController.js

const crypto = require("crypto");
const UserSession = require("../models/UserSession");
const KeyAssignment = require("../models/KeyAssignment");

// Generate RSA key pair (PEM)
function generateRsaKeyPair(keySize = 2048) {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: keySize,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" }
  });

  return { publicKeyPem: publicKey, privateKeyPem: privateKey };
}

// Issue a key for a user session
exports.issueSessionKey = async (req, res) => {
  try {
    const { sessionId, alias, keySize } = req.body;

    const session = await UserSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.sessioncomplete === 1) {
      return res.status(400).json({ message: "Session is closed" });
    }

    const { publicKeyPem, privateKeyPem } = generateRsaKeyPair(keySize || 2048);

    const assignment = await KeyAssignment.create({
      sessionId: session._id,
      keyId: crypto.randomUUID(), // your model expects keyId
      alias,
      publicKey: publicKeyPem,
      privateKey: privateKeyPem,
      deliveredToUser: false
    });

    // Return only public key to the application user
    res.status(201).json({
      id: assignment._id,
      sessionId: assignment.sessionId,
      keyId: assignment.keyId,
      alias: assignment.alias,
      publicKey: assignment.publicKey,
      createdAt: assignment.createdAt
    });
  } catch (err) {
    console.error("Error issuing key:", err);
    res.status(500).json({ message: "Failed to issue key" });
  }
};

// Get all keys for a session
exports.getSessionKeys = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await UserSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    const keys = await KeyAssignment.find({ sessionId }).select(
      "keyId alias publicKey createdAt"
    );

    res.json(keys);
  } catch (err) {
    console.error("Error fetching session keys:", err);
    res.status(500).json({ message: "Failed to fetch keys" });
  }
};

// Delete a key
exports.deleteKey = async (req, res) => {
  try {
    const { id } = req.params;

    const key = await KeyAssignment.findByIdAndDelete(id);
    if (!key) {
      return res.status(404).json({ message: "Key not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error("Error deleting key:", err);
    res.status(500).json({ message: "Failed to delete key" });
  }
};
