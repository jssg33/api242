// Audit/controllers/databaseservers.controllers.js — port of analyticsgen4rev2/Audit/databaseservers.controllers.cs
// (DatabaseServerController).
const DatabaseServer = require("../models/databaseservers.models");

exports.getAll = async (req, res) => {
  try {
    res.json(await DatabaseServer.find());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await DatabaseServer.findById(req.params.id);
    if (!item) return res.status(404).end();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    res.json(await DatabaseServer.create(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await DatabaseServer.findById(req.params.id);
    if (!item) return res.status(404).end();

    const fields = [
      "inventoryId", "serverName", "hostname", "ipAddress", "databasePlatform", "version", "databaseInstance",
      "azureURL", "azureIP", "cName1", "cName2", "cName3", "environment", "location", "azureSubscription",
      "resourceGroup", "region", "owner", "supportTeam", "backupSolution", "recoveryModel", "publicFacing",
      "active", "notes", "userList", "userDenyList"
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
    const item = await DatabaseServer.findById(req.params.id);
    if (!item) return res.status(404).end();
    await item.deleteOne();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
