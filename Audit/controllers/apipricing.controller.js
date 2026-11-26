// Audit/controllers/apipricing.controller.js — port of analyticsgen4rev2/Audit/apipricing.controller.cs (ApiPricingController).
const ApiPricing = require("../models/apipricing.model");
const ApiInterfacesAudit = require("../models/apiauditinterfaces.model");

// GET / -> 02GetApiPricing
exports.getAll = async (req, res) => {
  try {
    res.json(await ApiPricing.find().sort({ apiGroup: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:id -> 04GetApiPricingById
exports.getById = async (req, res) => {
  try {
    const entity = await ApiPricing.findById(req.params.id);
    if (!entity) return res.status(404).end();
    res.json(entity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / -> 06CreateApiPricing
exports.create = async (req, res) => {
  try {
    const input = { ...req.body, createdDate: new Date() };
    if (input.pricePerUse == null) input.pricePerUse = 0.05;
    if (input.active == null) input.active = true;

    const saved = await ApiPricing.create(input);
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /:id -> 08UpdateApiPricing
exports.update = async (req, res) => {
  try {
    const entity = await ApiPricing.findById(req.params.id);
    if (!entity) return res.status(404).end();

    const { apiGroup, description, pricePerUse, active } = req.body;
    Object.assign(entity, { apiGroup, description, pricePerUse, active, modifiedDate: new Date() });

    await entity.save();
    res.json(entity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /:id -> 10DeleteApiPricing
exports.remove = async (req, res) => {
  try {
    const entity = await ApiPricing.findById(req.params.id);
    if (!entity) return res.status(404).end();
    await entity.deleteOne();
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /sync -> 11SyncApiPricing (one ApiPricing row per distinct ApiInterfacesAudit.controllerName not already priced)
exports.sync = async (req, res) => {
  try {
    const apiGroups = await ApiInterfacesAudit.distinct("controllerName", { controllerName: { $nin: [null, ""] } });

    let inserted = 0;
    for (const groupName of apiGroups) {
      const exists = await ApiPricing.exists({ apiGroup: groupName });
      if (exists) continue;

      await ApiPricing.create({
        apiGroup: groupName,
        description: groupName,
        pricePerUse: 0.05,
        active: true,
        createdDate: new Date()
      });
      inserted++;
    }

    res.json({ success: true, inserted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
