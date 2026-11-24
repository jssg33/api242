// services/AuditBlobImport.js
// Node port of the C# AuditBlobImport (G4 ControllersGridSystemActions/ImportSecurityBlobText.cs), plus
// dumpAZSchema, which routes/SystemConsoleRoutes.js calls here (option 1). In the C# APIs that lives in
// SystemCLISupport / SchemaTools. The name is kept from the G4; here it dumps the MongoDB schema, not Azure SQL.

const fs = require("fs");
const path = require("path");
const AuditBlob = require("../models/AuditBlob");
const MongoCatalog = require("./MongoCatalog");
const { IO_DIR, ensureIoDir, stamp } = require("./AuditIO");

// Option 1: every Mongoose model's collection, fields and indexes, plus live collections with no model.
// Written to ./SQLDATA/EnterpriseSchema_<stamp>.json and saved as an AuditBlob (BlobType SQLSCHEMA).
async function dumpAZSchema() {
  const schemaName = MongoCatalog.databaseName();
  const models = MongoCatalog.getModels();
  const modelled = new Set(models.map((m) => m.collectionName.toLowerCase()));
  const unmodelled = (await MongoCatalog.getLiveCollections()).filter((c) => !modelled.has(c.toLowerCase()));

  const dump = {
    databaseType: "MongoDB",
    database: schemaName,
    generatedUtc: new Date().toISOString(),
    collections: models.map((m) => ({
      collection: m.collectionName,
      model: m.modelName,
      fields: MongoCatalog.getFields(m.schema),
      indexes: m.schema.indexes().map(([keys, options]) => ({ keys, options }))
    })),
    collectionsWithoutModel: unmodelled
  };

  const script = JSON.stringify(dump, null, 2);
  const fileName = `EnterpriseSchema_${stamp()}_${String(Date.now() % 1000).padStart(3, "0")}.json`;
  const outputDir = path.resolve(process.cwd(), "SQLDATA");
  fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, fileName);
  fs.writeFileSync(outputPath, script, "utf8");

  let auditBlobId = null;
  try {
    const blob = await AuditBlob.create({
      blobType: "SQLSCHEMA",
      fileName,
      filePath: outputPath,
      auditType: "MongoDB Schema Dump",
      blobText: script,
      blobSize: Buffer.byteLength(script, "utf8"),
      createdDate: new Date(),
      importedDate: new Date(),
      processed: false
    });
    auditBlobId = blob._id;
  } catch (err) {
    console.warn(`WARNING: AuditBlob insert failed. ${err.message}`);
  }

  return { fileName, filePath: outputPath, collections: dump.collections.length, auditBlobId };
}

// Option 4: import ./IO/*audit_*.txt into AuditBlob, then move each file to ./IO/Processed.
// Returns the number imported (files already imported are moved or deleted, not re-imported).
async function importAuditFiles() {
  if (!fs.existsSync(IO_DIR)) {
    throw new Error(`Audit IO folder not found: ${IO_DIR}`);
  }

  const processedDir = path.join(IO_DIR, "Processed");
  fs.mkdirSync(processedDir, { recursive: true });

  const files = fs
    .readdirSync(IO_DIR, { withFileTypes: true })
    .filter((d) => d.isFile() && /audit_.*\.txt$/i.test(d.name))
    .map((d) => d.name);

  let imported = 0;

  for (const fileName of files) {
    const file = path.join(IO_DIR, fileName);
    const processedPath = path.join(processedDir, fileName);

    try {
      const exists = await AuditBlob.exists({ fileName });

      if (exists) {
        // Already imported: move it out of IO, or delete it if Processed already has a copy
        if (fs.existsSync(processedPath)) fs.unlinkSync(file);
        else fs.renameSync(file, processedPath);
        continue;
      }

      const text = fs.readFileSync(file, "utf8");
      const info = fs.statSync(file);

      await AuditBlob.create({
        fileName,
        filePath: file,
        auditType: determineAuditType(fileName),
        blobText: text,
        blobSize: info.size,
        createdDate: determineCreatedDate(fileName, info),
        importedDate: new Date(),
        processed: true
      });

      if (fs.existsSync(processedPath)) fs.unlinkSync(processedPath);
      fs.renameSync(file, processedPath);

      imported++;
    } catch (err) {
      console.error(`Audit Import Error (${file}):`, err);
    }
  }

  return imported;
}

function determineAuditType(fileName) {
  const name = fileName.toLowerCase();
  if (name.includes("security")) return "SecurityAudit";
  if (name.includes("field")) return "FieldAudit";
  if (name.includes("table")) return "TableAudit";
  if (name.includes("schema")) return "SchemaAudit";
  return "GeneralAudit";
}

// Reads the UTC timestamp from names like mongosecurityaudit_20261009_190101.txt; falls back to the file time.
function determineCreatedDate(fileName, info) {
  const parts = path.basename(fileName, path.extname(fileName)).split("_");
  if (parts.length >= 3) {
    const d = parts[parts.length - 2];
    const t = parts[parts.length - 1];
    if (/^\d{8}$/.test(d) && /^\d{6}$/.test(t)) {
      const iso = `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}T${t.slice(0, 2)}:${t.slice(2, 4)}:${t.slice(4, 6)}Z`;
      const parsed = new Date(iso);
      if (!isNaN(parsed)) return parsed;
    }
  }
  return info.birthtime || info.mtime;
}

module.exports = { dumpAZSchema, importAuditFiles };
