// Audit/controllers/webserver.controller.js — port of analyticsgen4rev2/Audit/webserver.controller.cs (WebServerController).
const WebServer = require("../models/webserver.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await WebServer.find());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await WebServer.findById(req.params.id);
    if (!item) return res.status(404).end();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    res.json(await WebServer.create(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await WebServer.findById(req.params.id);
    if (!item) return res.status(404).end();

    const fields = [
      "inventoryId", "serverName", "hostname", "ipAddress", "operatingSystem", "webServerType", "version",
      "azureURL", "azureIP", "cName1", "cName2", "cName3", "applicationURL", "environment", "location",
      "azureSubscription", "resourceGroup", "region", "owner", "isProxy", "isProxySlave", "supportTeam",
      "tlsVersion", "publicFacing", "active", "notes"
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
    const item = await WebServer.findById(req.params.id);
    if (!item) return res.status(404).end();
    await item.deleteOne();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
