// Audit/controllers/databasefields.controller.js
// Node port of analyticsgen4rev2/Audit/databasefields.controller.cs (DatabaseFieldsController).
const DatabaseField = require("../models/databasefields.model");

// GET / -> IDatabaseFieldService29.GetAll29
exports.getAll = async (req, res) => {
  try {
    const items = await DatabaseField.find().sort({ tableName: 1, fieldName: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:id -> IDatabaseFieldService29.GetById29
exports.getById = async (req, res) => {
  try {
    const item = await DatabaseField.findById(req.params.id);
    if (!item) return res.status(404).end();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /table/:tableName -> IDatabaseFieldService29.GetByTable29
exports.getByTable = async (req, res) => {
  try {
    const items = await DatabaseField.find({ tableName: req.params.tableName }).sort({ fieldName: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / -> IDatabaseFieldService29.Create29
exports.create = async (req, res) => {
  try {
    const field = new DatabaseField({ ...req.body, createdDate: new Date() });
    const saved = await field.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /:id -> IDatabaseFieldService29.Update29
exports.update = async (req, res) => {
  try {
    const existing = await DatabaseField.findById(req.params.id);
    if (!existing) return res.status(404).end();

    const {
      databaseTableId, tableName, schemaName, fieldName, dataType, clrType,
      isNullable, maxLength, isPrimaryKey, isActive, userList, userDenyList
    } = req.body;
    Object.assign(existing, {
      databaseTableId, tableName, schemaName, fieldName, dataType, clrType,
      isNullable, maxLength, isPrimaryKey, isActive, userList, userDenyList,
      lastAuditDate: new Date()
    });

    await existing.save();
    res.json(existing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /:id -> IDatabaseFieldService29.Delete29
exports.remove = async (req, res) => {
  try {
    const existing = await DatabaseField.findById(req.params.id);
    if (!existing) return res.status(404).end();
    await existing.deleteOne();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /discovery -> IDatabaseFieldService29.GetDiscovery29
exports.discoveryInfo = async (req, res) => {
  try {
    const count = await DatabaseField.countDocuments();
    res.json({
      controller: "DatabaseFieldsController",
      entity: "DatabaseField",
      recordCount: count,
      discoveryDate: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
