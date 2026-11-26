// Audit/controllers/webfarmserver.controller.js
// Node port of analyticsgen4rev2/Audit/webfarmserver.controller.cs (WebFarmServerController).
const WebFarmServer = require("../models/webfarmserver.model");

// GET / -> IWebFarmServerService23.GetAll23
exports.getAll = async (req, res) => {
  try {
    res.json(await WebFarmServer.find());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:id -> IWebFarmServerService23.GetById23
exports.getById = async (req, res) => {
  try {
    const item = await WebFarmServer.findById(req.params.id);
    if (!item) return res.status(404).end();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / -> IWebFarmServerService23.Create23
exports.create = async (req, res) => {
  try {
    res.json(await WebFarmServer.create(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /:id -> IWebFarmServerService23.Delete23
exports.remove = async (req, res) => {
  try {
    const item = await WebFarmServer.findById(req.params.id);
    if (!item) return res.status(404).end();
    await item.deleteOne();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
