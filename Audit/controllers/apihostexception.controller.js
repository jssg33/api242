// Audit/controllers/apihostexception.controller.js — port of analyticsgen4rev2/Audit/apihostexception.controller.cs
// (ApiHostExceptionController).
const ApiHostException = require("../models/apihostexception.model");

// GET / -> IApiHostExceptionService12.GetAll12
exports.getAll = async (req, res) => {
  try {
    res.json(await ApiHostException.find().sort({ _id: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:id -> IApiHostExceptionService12.GetById12
exports.getById = async (req, res) => {
  try {
    const item = await ApiHostException.findById(req.params.id);
    if (!item) return res.status(404).end();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /host/:apiHostId -> IApiHostExceptionService12.GetByHost12
exports.getByHost = async (req, res) => {
  try {
    const items = await ApiHostException.find({ apiHostId: Number(req.params.apiHostId) }).sort({ _id: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / -> IApiHostExceptionService12.Create12
exports.create = async (req, res) => {
  try {
    const item = await ApiHostException.create({ ...req.body, createdDate: req.body.createdDate || new Date() });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /:id -> IApiHostExceptionService12.Update12
exports.update = async (req, res) => {
  try {
    const item = await ApiHostException.findById(req.params.id);
    if (!item) return res.status(404).end();

    const { apiHostId, exceptionType, reason, approvedBy, approvalDate, expirationDate, active, notes } = req.body;
    Object.assign(item, { apiHostId, exceptionType, reason, approvedBy, approvalDate, expirationDate, active, notes });

    await item.save();
    res.status(202).json({ message: `Updated ID:${item._id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /:id -> IApiHostExceptionService12.Delete12
exports.remove = async (req, res) => {
  try {
    const item = await ApiHostException.findById(req.params.id);
    if (!item) return res.status(404).end();
    await item.deleteOne();
    res.status(202).json({ message: `Deleted ID:${req.params.id}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
