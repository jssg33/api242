// services/AuditorPostService.js
// Sends api242's structure to its parent CockyAuditor (the G4), like the G2's postaudit:
//   POST {Globals.AUDITOR_URL_ROOT}/api/structureingest   header X-Auditor-Key: Globals.AUDITOR_INGEST_KEY
// Unlike the G2 (which sends what its audits stored), this sends the live Mongoose/MongoDB structure from
// MongoCatalog.getStructure(), the same JSON option 11 answers a poll with.

const Globals = require("./Globals");
const MongoCatalog = require("./MongoCatalog");

const INGEST_PATH = "/api/structureingest";
const KEY_HEADER = "X-Auditor-Key";

async function postStructure() {
  const url = Globals.AUDITOR_URL_ROOT.replace(/\/+$/, "") + INGEST_PATH;

  if (!Globals.AUDITOR_INGEST_KEY) {
    return { success: false, url, message: "No Auditor key (Globals.AUDITOR_INGEST_KEY). Nothing sent." };
  }

  const structure = await MongoCatalog.getStructure();

  if (!structure.tables.length && !structure.fields.length) {
    return { success: false, url, message: "No collections or fields found. Nothing sent." };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", [KEY_HEADER]: Globals.AUDITOR_INGEST_KEY },
      body: JSON.stringify(structure),
      signal: AbortSignal.timeout(60000)
    });

    const text = await response.text();
    let reply;
    try {
      reply = JSON.parse(text);
    } catch {
      reply = text;
    }

    return {
      success: response.ok,
      url,
      status: response.status,
      tables: structure.tables.length,
      fields: structure.fields.length,
      auditorReply: reply
    };
  } catch (err) {
    return { success: false, url, message: `Could not reach the Auditor: ${err.message}` };
  }
}

module.exports = { postStructure };
