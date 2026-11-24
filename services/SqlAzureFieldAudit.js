// services/SqlAzureFieldAudit.js
// MongoDB version of the G4's SqlAzureFieldAudit (ControllersGridSystemActions/sqlazurefieldaudit.cs); the name is
// kept so routes/SystemConsoleRoutes.js (option 6) matches the G4. One DatabaseFields row per Mongoose schema path,
// linked to its DatabaseTables row when the table audit (option 7) has recorded it.

const DatabaseField = require("../models/DatabaseField");
const DatabaseTable = require("../models/DatabaseTable");
const MongoCatalog = require("./MongoCatalog");

const key = (...parts) => parts.map((p) => String(p || "").trim().toLowerCase()).join(".");

// Returns TableAuditControlBlock (camelCase); tablesInserted / tablesUpdated count fields, as in the C# version
async function runAudit() {
  const result = {
    success: false,
    auditFileName: null,
    auditFilePath: null,
    recordCount: 0,
    reportLength: 0,
    auditDateUTC: new Date().toISOString(),
    tablesInserted: 0,
    tablesUpdated: 0,
    auditFiles: []
  };

  try {
    const schemaName = MongoCatalog.databaseName();
    const now = new Date();

    const existing = new Map(
      (await DatabaseField.find({}).select("_id schemaName tableName fieldName").lean())
        .map((r) => [key(r.schemaName, r.tableName, r.fieldName), r])
    );
    const tableIds = new Map(
      (await DatabaseTable.find({}).select("_id schemaName tableName").lean())
        .map((r) => [key(r.schemaName, r.tableName), r._id])
    );

    const ops = [];
    for (const m of MongoCatalog.getModels()) {
      const tableId = tableIds.get(key(schemaName, m.collectionName)) || null;

      for (const f of MongoCatalog.getFields(m.schema)) {
        result.recordCount++;

        const set = {
          dataType: f.dataType,
          clrType: null,
          isNullable: f.isNullable,
          maxLength: f.maxLength,
          isPrimaryKey: f.isPrimaryKey,
          lastAuditDate: now,
          isActive: true,
          LastUpdateDate: now
        };
        if (tableId) set.databaseTableId = tableId;

        const k = key(schemaName, m.collectionName, f.fieldName);
        const found = existing.get(k);

        if (found) {
          ops.push({ updateOne: { filter: { _id: found._id }, update: { $set: set } } });
          result.tablesUpdated++;
        } else {
          ops.push({
            insertOne: {
              document: {
                tableName: m.collectionName,
                schemaName,
                fieldName: f.fieldName,
                createdDate: now,
                InsertDate: now,
                ...set
              }
            }
          });
          existing.set(k, {});
          result.tablesInserted++;
        }
      }
    }

    if (ops.length) await DatabaseField.bulkWrite(ops, { ordered: false });

    result.success = true;
    result.auditDateUTC = new Date().toISOString();
    return result;
  } catch (err) {
    return {
      ...result,
      success: false,
      recordCount: 0,
      tablesInserted: 0,
      tablesUpdated: 0,
      auditFiles: [{ fileName: err.message, fileSize: 0, lastModifiedUTC: new Date().toISOString() }]
    };
  }
}

module.exports = { runAudit };
