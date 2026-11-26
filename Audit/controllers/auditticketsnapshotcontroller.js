// Audit/controllers/auditticketsnapshotcontroller.js
// Node port of analyticsgen4rev2/Audit/auditticketsnapshotcontroller.cs (AuditTicketSnapshots).
// Build 220: the surveillance + customer ticket queue at the moment of each audit run.
const AuditTicketSnapshot = require("../models/auditticketsnapshot.model");
const WorkerTroubleTicket = require("../models/apiaudittrouble");
const UserHelp = require("../../models/userhelp");

const CLOSED = /^(closed|resolved|done|complete|completed|cancel+ed|fixed)$/i;
const PROGRESS = /(progress|working|assigned|pending|wait|hold)/i;

// Same Open / In progress / Closed buckets as the Dashboard's ticket charts
function bucket(status) {
  const s = (status || "").trim();
  if (CLOSED.test(s)) return "closed";
  if (PROGRESS.test(s)) return "progress";
  return "open";
}

// Writes one Surveillance row per API with tickets in the queue, and one Customer row. Never throws: a failed
// snapshot must not fail the audit save that triggered it; the error text is returned instead.
async function capture(auditResultId) {
  try {
    const now = new Date();
    const tickets = await WorkerTroubleTicket.find().select("apiName status isHardDown").lean();

    const byApi = new Map();
    for (const t of tickets) {
      const b = bucket(t.status);
      if (b === "closed") continue;

      const api = (t.apiName || "").trim() || "(no API)";
      const key = api.toLowerCase();
      if (!byApi.has(key)) byApi.set(key, { apiName: api, open: 0, progress: 0, hardDown: 0, total: 0 });

      const row = byApi.get(key);
      if (b === "open") row.open++;
      if (b === "progress") row.progress++;
      if (t.isHardDown) row.hardDown++;
      row.total++;
    }

    const rows = [...byApi.values()].map((row) => ({
      auditResultId,
      snapshotDate: now,
      ticketSource: "Surveillance",
      apiName: row.apiName.slice(0, 255),
      openCount: row.open,
      inProgressCount: row.progress,
      hardDownCount: row.hardDown,
      inQueueCount: row.total
    }));

    // Customer tickets (Userhelp): no status column, so "in queue" = not responded to yet
    const customerOpen = await UserHelp.countDocuments({
      $or: [{ responsedate: null }, { responsedate: { $exists: false } }]
    });
    rows.push({
      auditResultId,
      snapshotDate: now,
      ticketSource: "Customer",
      apiName: "(all)",
      openCount: customerOpen,
      inQueueCount: customerOpen
    });

    await AuditTicketSnapshot.insertMany(rows);
    return { rows: rows.length, error: null };
  } catch (e) {
    return { rows: 0, error: e.message };
  }
}

// GET / -> IAuditTicketSnapshotService01.GetAll01
exports.getAll = async (req, res) => {
  try {
    const rows = await AuditTicketSnapshot.find().sort({ snapshotDate: -1, ticketSource: 1, apiName: 1 });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /series -> IAuditTicketSnapshotService01.GetSeries01 (Report 10: one point per snapshot/audit run)
exports.getSeries = async (req, res) => {
  try {
    const rows = await AuditTicketSnapshot.find().lean();
    const groups = new Map();
    for (const r of rows) {
      const key = new Date(r.snapshotDate).toISOString();
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(r);
    }

    const points = [...groups.entries()]
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
      .map(([snapshotDate, g]) => {
        const surveillance = g.filter((r) => r.ticketSource === "Surveillance");
        const customer = g.filter((r) => r.ticketSource === "Customer");
        return {
          snapshotDate,
          auditResultId: g.map((r) => r.auditResultId).find((id) => id != null) ?? null,
          surveillance: surveillance.reduce((s, r) => s + r.inQueueCount, 0),
          surveillanceHardDown: surveillance.reduce((s, r) => s + r.hardDownCount, 0),
          customer: customer.reduce((s, r) => s + r.inQueueCount, 0),
          byApi: surveillance
            .slice()
            .sort((a, b) => b.inQueueCount - a.inQueueCount)
            .map((r) => ({
              apiName: r.apiName,
              inQueue: r.inQueueCount,
              open: r.openCount,
              inProgress: r.inProgressCount,
              hardDown: r.hardDownCount
            }))
        };
      });

    res.json({ snapshots: points.length, points });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /capture -> IAuditTicketSnapshotService01.Capture01
exports.capture = async (req, res) => {
  const { rows, error } = await capture(null);
  if (error) return res.status(500).json({ error });
  res.json({ rows });
};

// POST /capture/:auditResultId -> IAuditTicketSnapshotService01.CaptureForRun01
exports.captureForRun = async (req, res) => {
  const auditResultId = Number(req.params.auditResultId);
  const { rows, error } = await capture(auditResultId);
  if (error) return res.status(500).json({ error });
  res.json({ rows, auditResultId });
};

// Exported so auditresultscontroller's save handler can call this directly, the way the C# POST /apiauditresults
// calls AuditTicketSnapshots.Capture in-process.
exports._capture = capture;
