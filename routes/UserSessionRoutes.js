const express = require("express");
const router = express.Router();
const UserSession = require("../models/UserSession");

/**
 * @swagger
 * components:
 *   schemas:
 *     UserSession:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         userid:
 *           type: number
 *         token:
 *           type: string
 *         acknowledged:
 *           type: number
 *         actionpriority:
 *           type: number
 *         sessionstart:
 *           type: string
 *         sessionend:
 *           type: string
 *         sessionrecorded:
 *           type: number
 *         sessionrecordurl:
 *           type: string
 *         sessiondescription:
 *           type: string
 *         sessionusername:
 *           type: string
 *         sessionemail:
 *           type: string
 *         sessionfirstname:
 *           type: string
 *         sessionlastname:
 *           type: string
 *         sessionfullname:
 *           type: string
 *         sessioncomplete:
 *           type: number
 *         twofactorkey:
 *           type: string
 *         twofactorkeysmsdestination:
 *           type: string
 *         twofactorkeyemaildestination:
 *           type: string
 *         twofactorprovider:
 *           type: string
 *         twofactorprovidertoken:
 *           type: string
 *         twofactorproviderauthstring:
 *           type: string
 *         useridasstring:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   - name: UserSessions
 *     description: User session tracking and authentication logs
 */

/**
 * @swagger
 * /usersessions:
 *   get:
 *     tags: [UserSessions]
 *     summary: Get all user sessions
 *     responses:
 *       200:
 *         description: List of user sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserSession'
 */
router.get("/", async (req, res) => {
  try {
    const sessions = await UserSession.find();
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /usersessions/{id}:
 *   get:
 *     tags: [UserSessions]
 *     summary: Get a user session by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User session found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSession'
 *       404:
 *         description: Session not found
 */
router.get("/:id", async (req, res) => {
  try {
    const session = await UserSession.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /usersessions:
 *   post:
 *     tags: [UserSessions]
 *     summary: Create a new user session
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSession'
 *     responses:
 *       201:
 *         description: User session created
 */
router.post("/", async (req, res) => {
  try {
    const session = new UserSession(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /usersessions/{id}:
 *   put:
 *     tags: [UserSessions]
 *     summary: Update a user session
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
 *             $ref: '#/components/schemas/UserSession'
 *     responses:
 *       200:
 *         description: User session updated
 *       404:
 *         description: Session not found
 */
router.put("/:id", async (req, res) => {
  try {
    const session = await UserSession.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /usersessions/{id}:
 *   delete:
 *     tags: [UserSessions]
 *     summary: Delete a user session
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User session deleted
 *       404:
 *         description: Session not found
 */
router.delete("/:id", async (req, res) => {
  try {
    const session = await UserSession.findByIdAndDelete(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.json({ message: "Session deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
