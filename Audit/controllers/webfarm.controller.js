// Audit/controllers/webfarm.controller.js — port of analyticsgen4rev2/Audit/webfarm.controller.cs (WebFarmController).
const WebFarm = require("../models/webfarm.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await WebFarm.find());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await WebFarm.findById(req.params.id);
    if (!item) return res.status(404).end();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    res.json(await WebFarm.create(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await WebFarm.findById(req.params.id);
    if (!item) return res.status(404).end();

    const fields = [
      "inventoryId", "farmName", "description", "loadBalancerName", "loadBalancerType", "virtualIpAddress",
      "url", "azureURL", "azureIP", "cName1", "cName2", "cName3", "applicationURL", "environment", "location",
      "azureSubscription", "resourceGroup", "region", "owner", "supportTeam", "tlsVersion", "backendPoolCount",
      "healthProbeUrl", "publicFacing", "enabled", "notes"
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
    const item = await WebFarm.findById(req.params.id);
    if (!item) return res.status(404).end();
    await item.deleteOne();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
