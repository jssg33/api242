const express = require("express");
const Manager = require("../models/Manager.js");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Managers
 *   description: Manager hierarchy and assignment API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Manager:
 *       type: object
 *       properties:
 *         manager:
 *           type: string
 *           description: Employee ID of the manager
 *         company:
 *           type: string
 *           description: Company ID
 *         users:
 *           type: array
 *           items:
 *             type: string
 *           description: List of employees managed
 *         supervisorid:
 *           type: string
 *           description: Manager ID of supervisor
 *         isceo:
 *           type: number
 *           enum: [0, 1]
 *           description: 1 = CEO, 0 = not CEO
 *       example:
 *         manager: "65f1c2a9b1234a0012cd5678"
 *         company: "65f1c2a9b1234a0012cd9999"
 *         users: ["65f1c2a9b1234a0012cd7777", "65f1c2a9b1234a0012cd8888"]
 *         supervisorid: "65f1c2a9b1234a0012cd1111"
 *         isceo: 0
 */

/* -------------------------
   CONTROLLERS
-------------------------- */

// GET all managers
const getManagers = async (req, res) => {
  try {
    const managers = await Manager.find()
      .populate("manager")
      .populate("company")
      .populate("users")
      .populate("supervisorid");

    res.json(managers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET manager by ID
const getManagerById = async (req, res) => {
  try {
    const manager = await Manager.findById(req.params.id)
      .populate("manager")
      .populate("company")
      .populate("users")
      .populate("supervisorid");

    if (!manager) return res.status(404).json({ message: "Manager not found" });

    res.json(manager);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE manager
const createManager = async (req, res) => {
  try {
    const manager = await Manager.create(req.body);
    res.status(201).json(manager);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE manager
const updateManager = async (req, res) => {
  try {
    const manager = await Manager.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!manager) return res.status(404).json({ message: "Manager not found" });

    res.json(manager);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE manager
const deleteManager = async (req, res) => {
  try {
    const manager = await Manager.findByIdAndDelete(req.params.id);

    if (!manager) return res.status(404).json({ message: "Manager not found" });

    res.json({ message: "Manager deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* -------------------------
   ROUTES + SWAGGER
-------------------------- */

router.get("/", getManagers);
router.get("/:id", getManagerById);
router.post("/", createManager);
router.put("/:id", updateManager);
router.delete("/:id", deleteManager);

module.exports = router;
