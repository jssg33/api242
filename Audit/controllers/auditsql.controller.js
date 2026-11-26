// Audit/controllers/auditsql.controller.js — port of analyticsgen4rev2/Audit/auditsql.controller.cs
// (AuditSqlController). The C# file is one big outlier (37 endpoints) only because it's seven near-identical
// CRUD resources (SQL servers/tables/fields/principals + three permission join tables) mapped in one group;
// a small crud() factory replaces copy-pasting the same five handlers seven times, matching
// context.Entry(existing).CurrentValues.SetValues(input)'s full-overwrite PUT semantics via Object.assign.
const AuditSqlServer = require("../models/auditsqlserver.model");
const AuditSqlTable = require("../models/auditsqltables.model");
const AuditSqlField = require("../models/auditsqlfields.model");
const AuditPrincipal = require("../models/auditprincipal.model");
const AuditServerPermission = require("../models/AuditServerPermission.model");
const AuditTablePermission = require("../models/audittablepermission");
const AuditFieldPermission = require("../models/auditfieldpermission.model");

function crud(Model, sortField) {
  return {
    getAll: async (req, res) => {
      try {
        res.json(await Model.find().sort(sortField ? { [sortField]: 1 } : {}));
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    },
    getById: async (req, res) => {
      try {
        const item = await Model.findById(req.params.id);
        if (!item) return res.status(404).end();
        res.json(item);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    },
    create: async (req, res) => {
      try {
        const item = await Model.create(req.body);
        res.status(201).json(item);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    },
    update: async (req, res) => {
      try {
        const item = await Model.findById(req.params.id);
        if (!item) return res.status(404).end();
        Object.assign(item, req.body);
        await item.save();
        res.json(item);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    },
    remove: async (req, res) => {
      try {
        const item = await Model.findById(req.params.id);
        if (!item) return res.status(404).end();
        await item.deleteOne();
        res.json({});
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    }
  };
}

// IAuditSqlServerService30
exports.servers = crud(AuditSqlServer, "serverName");

// IAuditSqlTableService31
exports.tables = crud(AuditSqlTable, "tableName");
exports.tables.getByServer = async (req, res) => {
  try {
    res.json(await AuditSqlTable.find({ sqlServerId: Number(req.params.serverId) }).sort({ tableName: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// IAuditSqlFieldService32
exports.fields = crud(AuditSqlField, "columnName");
exports.fields.getByTable = async (req, res) => {
  try {
    res.json(await AuditSqlField.find({ sqlTableId: Number(req.params.tableId) }).sort({ columnName: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// IAuditPrincipalService33
exports.principals = crud(AuditPrincipal, "userName");

// IAuditServerPermissionService34
exports.serverPermissions = crud(AuditServerPermission);
exports.serverPermissions.getByPrincipal = async (req, res) => {
  try {
    res.json(await AuditServerPermission.find({ principalId: Number(req.params.principalId) }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// IAuditTablePermissionService35
exports.tablePermissions = crud(AuditTablePermission);
exports.tablePermissions.getByPrincipal = async (req, res) => {
  try {
    res.json(await AuditTablePermission.find({ principalId: Number(req.params.principalId) }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// IAuditFieldPermissionService36
exports.fieldPermissions = crud(AuditFieldPermission);
exports.fieldPermissions.getByPrincipal = async (req, res) => {
  try {
    res.json(await AuditFieldPermission.find({ principalId: Number(req.params.principalId) }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
