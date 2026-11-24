// services/MongoCatalog.js
// Reads api242's data structure for the audits: the MongoDB/Mongoose counterpart of the G2's SqliteCatalog.
//   "schema" = the MongoDB database name
//   "table"  = a Mongoose model and its collection (plus live collections that have no model)
//   "field"  = a schema path (type, required, maxlength, _id as the primary key)

const os = require("os");
const mongoose = require("mongoose");

function databaseName() {
  return (mongoose.connection.db && mongoose.connection.db.databaseName) || mongoose.connection.name || "unknown";
}

// One entry per registered model (all routes load their models at startup in server.js)
function getModels() {
  return Object.values(mongoose.models)
    .map((model) => ({
      modelName: model.modelName,
      collectionName: model.collection.collectionName,
      schema: model.schema
    }))
    .sort((a, b) => a.collectionName.localeCompare(b.collectionName, undefined, { sensitivity: "base" }));
}

function getFields(schema) {
  return Object.entries(schema.paths).map(([name, type]) => {
    const options = type.options || {};
    const maxLength = options.maxlength ?? options.maxLength;
    return {
      fieldName: name,
      dataType: type.instance,
      isRequired: !!type.isRequired,
      isNullable: !type.isRequired && name !== "_id",
      isPrimaryKey: name === "_id",
      maxLength: Array.isArray(maxLength) ? maxLength[0] : (typeof maxLength === "number" ? maxLength : null),
      enumValues: Array.isArray(options.enum) ? options.enum : (type.enumValues && type.enumValues.length ? type.enumValues : null),
      isUnique: !!options.unique,
      hasDefault: options.default !== undefined
    };
  });
}

// Collections in the live database (needs a connection; [] when not connected)
async function getLiveCollections() {
  if (!mongoose.connection.db) return [];
  const list = await mongoose.connection.db.listCollections({}, { nameOnly: true }).toArray();
  return list
    .map((c) => c.name)
    .filter((n) => !n.startsWith("system."))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

async function getRowCount(collectionName) {
  if (!mongoose.connection.db) return null;
  return mongoose.connection.db.collection(collectionName).estimatedDocumentCount();
}

// Tables: every model, plus live collections with no model (modelName null, columnCount 0)
async function getTables() {
  const models = getModels();
  const tables = models.map((m) => ({
    tableName: m.collectionName,
    modelName: m.modelName,
    columnCount: Object.keys(m.schema.paths).length,
    hasModel: true
  }));

  const modelled = new Set(models.map((m) => m.collectionName.toLowerCase()));
  for (const name of await getLiveCollections()) {
    if (!modelled.has(name.toLowerCase())) {
      tables.push({ tableName: name, modelName: null, columnCount: 0, hasModel: false });
    }
  }
  return tables;
}

// Structure in the same shape the Auditor's POST /api/structureingest takes (G4 StructureIngestRequest),
// which is also what the G2's postaudit sends.
async function getStructure() {
  const schemaName = databaseName();
  const now = new Date();
  const tables = await getTables();

  const fields = [];
  for (const m of getModels()) {
    for (const f of getFields(m.schema)) {
      fields.push({
        schemaName,
        tableName: m.collectionName,
        fieldName: f.fieldName,
        dataType: f.dataType,
        clrType: null,
        isNullable: f.isNullable,
        maxLength: f.maxLength,
        isPrimaryKey: f.isPrimaryKey
      });
    }
  }

  return {
    sourceApi: require("./Globals").THIS_API_NAME,
    sourceHost: os.hostname(),
    databaseType: "MongoDB",
    auditDateUtc: now.toISOString(),
    tables: tables.map((t) => ({
      schemaName,
      tableName: t.tableName,
      modelName: t.modelName,
      columnCount: t.columnCount,
      lastAuditDate: now.toISOString()
    })),
    fields
  };
}

module.exports = {
  databaseName,
  getModels,
  getFields,
  getLiveCollections,
  getRowCount,
  getTables,
  getStructure
};
