// Audit/controllers/databases.controller.js — port of analyticsgen4rev2/Audit/databases.controller.cs (DatabaseController).
const Database = require("../models/databases.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Database.find());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Database.findById(req.params.id);
    if (!item) return res.status(404).end();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    res.json(await Database.create(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Database.findById(req.params.id);
    if (!item) return res.status(404).end();

    const fields = [
      "inventoryId", "databaseServerId", "databaseName", "description", "databaseType", "version",
      "classification", "owner", "supportTeam", "backupRequired", "encryptionEnabled", "containsPII",
      "containsPHI", "containsPCI", "active", "notes", "userList", "userDenyList"
    ];
    for (const f of fields) if (f in req.body) item[f] = req.body[f];

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const item = await Database.findById(req.params.id);
    if (!item) return res.status(404).end();
    await item.deleteOne();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
