// services/SqlAzureTableAudit.js
// MongoDB version of the G4's SqlAzureTableAudit (ControllersGridSystemActions/sqlazuretableaudit.cs); the name is
// kept so routes/SystemConsoleRoutes.js (option 7) matches the G4. Inventories every Mongoose model / collection
// (plus live collections with no model) into DatabaseTables and writes ./IO/mongotableaudit_<stamp>.txt.

const DatabaseTable = require("../models/DatabaseTable");
const MongoCatalog = require("./MongoCatalog");
const { writeReport, listIoFiles } = require("./AuditIO");

const key = (...parts) => parts.map((p) => String(p || "").trim().toLowerCase()).join(".");

// Returns TableAuditControlBlock (camelCase)
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
    const tables = await MongoCatalog.getTables();
    const now = new Date();

    const existing = new Map(
      (await DatabaseTable.find({}).select("_id schemaName tableName").lean()).map((r) => [key(r.schemaName, r.tableName), r])
    );

    const lines = [
      "================================================",
      "MONGODB TABLE AUDIT",
      "================================================",
      `Generated UTC : ${now.toISOString().replace("T", " ").slice(0, 19)}`,
      `Database      : ${schemaName}`,
      "",
      "MONGODB COLLECTION INVENTORY",
      "---------------------------------------------"
    ];

    const ops = [];
    for (const t of tables) {
      lines.push(`${schemaName}.${t.tableName} | Model=${t.modelName || "(none)"} | Columns=${t.columnCount}`);
      result.recordCount++;

      const found = existing.get(key(schemaName, t.tableName));
      const set = { modelName: t.modelName, columnCount: t.columnCount, lastAuditDate: now, isActive: true, LastUpdateDate: now };

      if (found) {
        ops.push({ updateOne: { filter: { _id: found._id }, update: { $set: set } } });
        result.tablesUpdated++;
        lines.push(`UPDATED: ${schemaName}.${t.tableName}`);
      } else {
        ops.push({
          insertOne: {
            document: { tableName: t.tableName, schemaName, createdDate: now, InsertDate: now, ...set }
          }
        });
        existing.set(key(schemaName, t.tableName), {});
        result.tablesInserted++;
        lines.push(`INSERTED: ${schemaName}.${t.tableName}`);
      }
    }

    if (ops.length) await DatabaseTable.bulkWrite(ops, { ordered: false });

    const withoutModel = tables.filter((t) => !t.hasModel);
    lines.push(
      "",
      "COLLECTIONS WITH NO MONGOOSE MODEL",
      "---------------------------------------------",
      ...(withoutModel.length ? withoutModel.map((t) => `${schemaName}.${t.tableName}`) : ["(none)"]),
      "",
      "AUDIT SUMMARY",
      "---------------------------------------------",
      `Collections Found : ${tables.length}`,
      `Mongoose Models   : ${tables.length - withoutModel.length}`,
      `No Model          : ${withoutModel.length}`,
      `Inserted          : ${result.tablesInserted}`,
      `Updated           : ${result.tablesUpdated}`,
      "",
      "END OF REPORT"
    );

    const report = lines.join("\n") + "\n";
    const { fileName, filePath } = writeReport("mongotableaudit", report);

    Object.assign(result, {
      success: true,
      auditFileName: fileName,
      auditFilePath: filePath,
      reportLength: report.length,
      auditDateUTC: new Date().toISOString(),
      auditFiles: listIoFiles()
    });
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
