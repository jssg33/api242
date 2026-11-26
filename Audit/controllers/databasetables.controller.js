// Audit/controllers/databasetables.controller.js
// Node port of analyticsgen4rev2/Audit/databasetables.controller.cs (DatabaseTablesController).
const DatabaseTable = require("../models/databasetables.model");
const SqlAzureTableAudit = require("../../services/SqlAzureTableAudit");

// GET / -> IDatabaseTableService08.GetAll08
exports.getAll = async (req, res) => {
  try {
    const tables = await DatabaseTable.find().sort({ tableName: 1 });
    res.json(tables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /:id -> IDatabaseTableService08.Update08
exports.update = async (req, res) => {
  try {
    const existing = await DatabaseTable.findById(req.params.id);
    if (!existing) return res.status(404).end();

    const { tableName, schemaName, modelName, columnCount, lastAuditDate, isActive, schemaArea, userList, userDenyList } = req.body;
    Object.assign(existing, {
      tableName, schemaName, modelName, columnCount, lastAuditDate, isActive, schemaArea, userList, userDenyList
    });

    await existing.save();
    res.json(existing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST /discover -> IDatabaseTableService08.Discover08
// The C# scans EF Core entity types; the Mongoose equivalent of "every known table" is already
// services/SqlAzureTableAudit.js (system console option 7), so this reuses it instead of re-deriving the same
// inventory-and-upsert logic.
exports.discover = async (req, res) => {
  try {
    const result = await SqlAzureTableAudit.runAudit();
    res.json({
      totalEntities: result.recordCount,
      inserted: result.tablesInserted,
      updated: result.tablesUpdated,
      auditDate: result.auditDateUTC
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:id -> IDatabaseTableService08.GetById08
exports.getById = async (req, res) => {
  try {
    const table = await DatabaseTable.findById(req.params.id);
    if (!table) return res.status(404).end();
    res.json(table);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /:id -> IDatabaseTableService08.Delete08
exports.remove = async (req, res) => {
  try {
    const table = await DatabaseTable.findById(req.params.id);
    if (!table) return res.status(404).end();
    await table.deleteOne();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /discovery -> IDatabaseTableService08.GetDiscovery08
exports.discoveryInfo = async (req, res) => {
  try {
    const count = await DatabaseTable.countDocuments();
    res.json({
      controller: "DatabaseTablesController",
      entity: "DatabaseTable",
      recordCount: count,
      discoveryDate: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
