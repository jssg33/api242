// services/AuditIO.js
// The ./IO folder the audits write their reports to and AuditBlobImport reads from (same as the C# APIs).
// Note: Render's disk is ephemeral, so files here are lost on every restart or deploy; the AuditBlob copies
// (option 4) are what persist.

const fs = require("fs");
const path = require("path");

const IO_DIR = path.resolve(process.cwd(), "IO");

function ensureIoDir() {
  fs.mkdirSync(IO_DIR, { recursive: true });
  return IO_DIR;
}

function stamp(date = new Date()) {
  // yyyyMMdd_HHmmss in UTC, as in the C# file names
  const iso = date.toISOString();
  return iso.slice(0, 10).replace(/-/g, "") + "_" + iso.slice(11, 19).replace(/:/g, "");
}

function writeReport(prefix, text) {
  ensureIoDir();
  const fileName = `${prefix}_${stamp()}.txt`;
  const filePath = path.join(IO_DIR, fileName);
  fs.writeFileSync(filePath, text, "utf8");
  return { fileName, filePath };
}

// [{ fileName, fileSize, lastModifiedUTC }] newest first (AuditFileInfo in the C# code)
function listIoFiles() {
  ensureIoDir();
  return fs
    .readdirSync(IO_DIR, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => {
      const stat = fs.statSync(path.join(IO_DIR, d.name));
      return { fileName: d.name, fileSize: stat.size, lastModifiedUTC: stat.mtime.toISOString() };
    })
    .sort((a, b) => (a.lastModifiedUTC < b.lastModifiedUTC ? 1 : -1));
}

module.exports = { IO_DIR, ensureIoDir, stamp, writeReport, listIoFiles };
