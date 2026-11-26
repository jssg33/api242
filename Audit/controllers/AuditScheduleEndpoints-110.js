// Audit/controllers/AuditScheduleEndpoints-110.js
// Port of analyticsgen4rev2/Audit/AuditScheduleEndpoints-110.cs (AuditScheduleRules + AuditScheduleEndpoints).
// Rules: Recurrence once | hourly | daily | weekly | monthly, every intervalCount; runs are on the grid
// startAt + k periods; a missed run runs once and the next one is the next slot after now (no catch-up burst);
// "once" switches itself off after it runs. Runner browser | server | any. A Running claim older than
// CLAIM_STALE_MINUTES counts as dead.
const AuditSchedule = require("../models/AuditScheduleEndpoints-110.model");
const Apihost = require("../models/apihosts.model");

const CLAIM_STALE_MINUTES = 30;
const RECURRENCES = ["once", "hourly", "daily", "weekly", "monthly"];
const RUNNERS = ["any", "browser", "server"];

function step(t, rule) {
  const d = new Date(t);
  switch (rule) {
    case "hourly":
      d.setUTCHours(d.getUTCHours() + 1);
      return d;
    case "daily":
      d.setUTCDate(d.getUTCDate() + 1);
      return d;
    case "weekly":
      d.setUTCDate(d.getUTCDate() + 7);
      return d;
    case "monthly":
      d.setUTCMonth(d.getUTCMonth() + 1);
      return d;
    default:
      return d;
  }
}

// The first slot on the grid startAt + k * (intervalCount periods) that is after `after`; null for "once".
function nextAfter(s, after) {
  const rule = (s.recurrence || "once").trim().toLowerCase();
  if (rule === "once" || !RECURRENCES.includes(rule)) return null;
  const n = Math.min(Math.max(s.intervalCount || 1, 1), 1000);
  let t = new Date(s.startAt);
  for (let guard = 0; t <= after && guard < 200000; guard++) {
    for (let i = 0; i < n; i++) t = step(t, rule);
  }
  return t;
}

function isDue(s, runner, now) {
  return (
    s.enabled &&
    s.nextRunAt != null &&
    new Date(s.nextRunAt) <= now &&
    (String(s.runner).toLowerCase() === "any" || String(s.runner).toLowerCase() === String(runner).toLowerCase()) &&
    !(
      String(s.status).toLowerCase() === "running" &&
      s.claimedAt != null &&
      new Date(s.claimedAt) > new Date(now.getTime() - CLAIM_STALE_MINUTES * 60000)
    )
  );
}

// Claim in one atomic update: wins only if nobody holds a fresh claim.
async function claim(id, claimedBy) {
  const now = new Date();
  const stale = new Date(now.getTime() - CLAIM_STALE_MINUTES * 60000);
  const by = String(claimedBy).slice(0, 200);

  const updated = await AuditSchedule.findOneAndUpdate(
    {
      _id: id,
      enabled: true,
      $or: [{ status: { $ne: "Running" } }, { claimedAt: null }, { claimedAt: { $lt: stale } }]
    },
    { $set: { status: "Running", claimedBy: by, claimedAt: now, modifiedDate: now } },
    { new: true }
  );
  return updated;
}

// After a run: outcome, last result, run count, next slot (none after "once": it switches itself off).
function complete(s, ok, outcome, resultId) {
  const now = new Date();
  const next = nextAfter(s, now);
  s.status = ok ? "Done" : "Failed";
  s.claimedBy = null;
  s.claimedAt = null;
  s.lastRunAt = now;
  if (resultId != null) s.lastResultId = resultId;
  s.lastOutcome = String(outcome).slice(0, 1000);
  s.runCount = (s.runCount || 0) + 1;
  s.nextRunAt = next;
  if (next == null) s.enabled = false;
  s.modifiedDate = now;
}

// Checks a new or edited record; null = fine.
function problem(s) {
  if (!s.apiHostId || s.apiHostId <= 0) return "ApiHostId is required.";
  if (!s.endpointGroup || !s.endpointGroup.trim()) return "EndpointGroup is required (the controller name, e.g. Users).";
  if (!RECURRENCES.includes(String(s.recurrence || "").toLowerCase())) return "Recurrence must be once, hourly, daily, weekly or monthly.";
  if (!RUNNERS.includes(String(s.runner || "").toLowerCase())) return "Runner must be any, browser or server.";
  if (s.intervalCount < 1 || s.intervalCount > 1000) return "IntervalCount must be 1-1000.";
  if (!s.startAt) return "StartAt is required.";
  return null;
}

function normalize(s) {
  s.recurrence = (s.recurrence || "once").trim().toLowerCase();
  s.runner = (s.runner || "any").trim().toLowerCase();
  s.endpointGroup = (s.endpointGroup || "").trim();
  s.startAt = new Date(s.startAt);
  if (s.nextRunAt != null) s.nextRunAt = new Date(s.nextRunAt);
  if (!s.intervalCount || s.intervalCount < 1) s.intervalCount = 1;
}

// GET / -> IAuditScheduleService19.GetAll19
exports.getAll = async (req, res) => {
  try {
    const rows = await AuditSchedule.find()
      .sort({ enabled: -1, nextRunAt: 1, _id: 1 })
      .lean();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /due/:runner -> IAuditScheduleService19.GetDue19
exports.getDue = async (req, res) => {
  try {
    const now = new Date();
    const candidates = await AuditSchedule.find({ enabled: true, nextRunAt: { $ne: null, $lte: now } }).lean();
    const rows = candidates.filter((s) => isDue(s, req.params.runner, now)).sort((a, b) => new Date(a.nextRunAt) - new Date(b.nextRunAt));
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:id -> IAuditScheduleService19.GetById19
exports.getById = async (req, res) => {
  try {
    const row = await AuditSchedule.findById(req.params.id).lean();
    res.json(row ? [row] : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / -> IAuditScheduleService19.Create19
exports.create = async (req, res) => {
  try {
    const input = { ...req.body };
    delete input._id;
    normalize(input);

    // A body without these says nothing, so the C# defaults apply.
    if (!("enabled" in req.body)) input.enabled = true;
    if (!("authCheck" in req.body)) input.authCheck = true;
    if (!("stampEndpoints" in req.body)) input.stampEndpoints = true;

    const prob = problem(input);
    if (prob) return res.status(400).json({ error: prob });

    const now = new Date();
    if (input.nextRunAt == null) {
      input.nextRunAt = new Date(input.startAt) > now ? input.startAt : nextAfter(input, now) || now;
    }
    input.status = input.enabled ? "Scheduled" : "Paused";
    input.claimedBy = null;
    input.claimedAt = null;
    input.runCount = 0;
    input.createdDate = now;
    input.modifiedDate = now;

    const hostExists = await Apihost.exists({ _id: input.apiHostId }).catch(() => false);
    if (!hostExists) return res.status(400).json({ error: `No API host with Id ${input.apiHostId}.` });

    const saved = await AuditSchedule.create(input);
    res.json({ success: true, id: saved._id, nextRunAt: saved.nextRunAt });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /:id -> IAuditScheduleService19.Update19 (only fields present in the body are copied, others left as they are)
exports.update = async (req, res) => {
  try {
    const x = await AuditSchedule.findById(req.params.id);
    if (!x) return res.status(404).json({ error: `No AuditSchedule with Id ${req.params.id}.` });

    const body = req.body;
    const has = (f) => f in body;
    const fields = [
      "name", "apiHostId", "endpointGroup", "recurrence", "intervalCount", "startAt", "nextRunAt", "enabled",
      "runner", "authCheck", "probeWrites", "stampEndpoints", "auditorName", "auditorId", "notes", "claimedBy",
      "claimedAt", "lastRunAt", "lastResultId", "runCount", "instanceId", "shardId"
    ];
    for (const f of fields) if (has(f)) x[f] = body[f];
    if (has("status")) x.status = body.status && body.status.trim() ? body.status : "Scheduled";
    if (has("lastOutcome")) x.lastOutcome = typeof body.lastOutcome === "string" ? body.lastOutcome.slice(0, 1000) : body.lastOutcome;

    x.modifiedDate = new Date();
    normalize(x);

    const prob = problem(x);
    if (prob) return res.status(400).json({ error: prob });

    await x.save();
    res.json({ success: true, id: x._id, nextRunAt: x.nextRunAt });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /:id -> IAuditScheduleService19.Delete19
exports.remove = async (req, res) => {
  try {
    const x = await AuditSchedule.findById(req.params.id);
    if (!x) return res.status(404).json({ error: `No AuditSchedule with Id ${req.params.id}.` });
    await x.deleteOne();
    res.json({ success: true, id: req.params.id, message: "AuditSchedule deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /:id/claim -> IAuditScheduleService19.Claim19
exports.claim = async (req, res) => {
  try {
    const { claimedBy, kind } = req.body || {};
    const by = claimedBy && claimedBy.trim() ? claimedBy : `${kind || "browser"}:${req.params.apiusername}`;

    const rec = await claim(req.params.id, by);
    if (!rec) {
      const now = await AuditSchedule.findById(req.params.id).lean();
      if (!now) return res.status(404).json({ error: `No AuditSchedule with Id ${req.params.id}.` });
      return res.status(409).json({
        claimed: false,
        error: now.enabled ? `Already running (${now.claimedBy}, since ${now.claimedAt}).` : "The schedule is paused.",
        claimedBy: now.claimedBy,
        claimedAt: now.claimedAt
      });
    }
    res.json({ claimed: true, record: rec });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports._rules = { nextAfter, isDue, claim, complete, problem, normalize };
