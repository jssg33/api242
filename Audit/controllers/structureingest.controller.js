// Audit/controllers/structureingest.controller.js
// Node port of analyticsgen4rev2/Audit/structureingest.controller.cs (StructureIngestEndpoints).
// CockyAuditor ingest: a monitored API (e.g. the G2, statsback542) POSTs its own table/field structure here.
// This is the inbound counterpart to the already-ported outbound side (services/AuditorPostService.js).
// Reuses the existing AuditBlob model (one row per post, blobType "APISTRUCTURE") and the already-configured
// services/Globals.AUDITOR_INGEST_KEY, instead of introducing a second ingest-key mechanism.
const crypto = require("crypto");
const AuditBlob = require("../../models/AuditBlob");
const Globals = require("../../services/Globals");

const KEY_HEADER = "x-auditor-key";
const BLOB_TYPE = "APISTRUCTURE";
const SOURCE_API_PATTERN = /^[A-Za-z0-9._-]{1,60}$/;

function keyIsValid(req) {
  const expected = Globals.AUDITOR_INGEST_KEY;
  if (!expected) return false;
  const sent = Buffer.from(String(req.headers[KEY_HEADER] || ""));
  const exp = Buffer.from(String(expected));
  return sent.length === exp.length && crypto.timingSafeEqual(sent, exp);
}

// POST / -> IStructureIngestService02.IngestApiStructure02
exports.ingest = async (req, res) => {
  try {
    if (!keyIsValid(req)) return res.status(401).end();

    const { sourceApi, sourceHost, databaseType, auditDateUtc } = req.body || {};
    const tables = (req.body && req.body.tables) || [];
    const fields = (req.body && req.body.fields) || [];

    if (!sourceApi || !SOURCE_API_PATTERN.test(sourceApi)) {
      return res.status(400).json({ error: "SourceApi is required: 1-60 characters, letters, digits, '.', '_' or '-'." });
    }
    if (tables.length === 0 && fields.length === 0) {
      return res.status(400).json({ error: "No tables or fields were sent." });
    }
    if (tables.length > 5000 || fields.length > 200000) {
      return res.status(400).json({ error: "Too many tables or fields in one post." });
    }

    const received = new Date();
    const snapshot = {
      sourceApi,
      sourceHost,
      databaseType,
      auditDateUtc,
      receivedUtc: received.toISOString(),
      remoteIp: req.ip,
      tables,
      fields
    };
    const json = JSON.stringify(snapshot);
    const stamp = received.toISOString().replace(/[-:]/g, "").replace("T", "_").slice(0, 15);

    const blob = await AuditBlob.create({
      blobType: BLOB_TYPE,
      auditType: `ApiStructure:${sourceApi}`,
      fileName: `${sourceApi}_apistructure_${stamp}.json`,
      filePath: "/api/structureingest",
      blobText: json,
      blobSize: Buffer.byteLength(json),
      createdDate: auditDateUtc || received,
      importedDate: received,
      processed: false
    });

    res.json({
      auditBlobId: blob._id,
      sourceApi,
      tables: tables.length,
      fields: fields.length,
      receivedUtc: received.toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:sourceApi/latest -> IStructureIngestService02.GetLatestApiStructure02
exports.getLatest = async (req, res) => {
  try {
    if (!keyIsValid(req)) return res.status(401).end();

    const { sourceApi } = req.params;
    if (!SOURCE_API_PATTERN.test(sourceApi)) {
      return res.status(400).json({ error: "Invalid sourceApi." });
    }

    const blob = await AuditBlob.findOne({ blobType: BLOB_TYPE, auditType: `ApiStructure:${sourceApi}` }).sort({ _id: -1 });
    if (!blob || !blob.blobText) return res.status(404).end();

    res.type("application/json").send(blob.blobText);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
