// Audit/controllers/auditresultscontroller.js — port of analyticsgen4rev2/Audit/auditresultscontroller.cs
// (AuditResultEndpoints).
const AuditResult = require("../models/auditresults.model");
const ApiauditRunHistory = require("../models/apiauditrunhistory.model");

// EPG = endpoint group: the controller segment after /api/ in the endpoint's path - same rule the client
// (Report 09's groupOf, authcheck.js) uses, ported here so /hostseries can aggregate it server-side.
function epgOf(url) {
  let u = url || "";
  try {
    u = decodeURIComponent(u);
  } catch {
    // leave u as-is on a malformed escape
  }
  u = u.split("?")[0];
  let path = u;
  try {
    path = new URL(u).pathname;
  } catch {
    // not an absolute URL; use u as the path
  }
  const segs = path.split("/").filter(Boolean);
  const i = segs.findIndex((s) => s.toLowerCase() === "api");
  const seg = i >= 0 && i + 1 < segs.length ? segs[i + 1] : segs[0] || null;
  const isParam = seg && seg.startsWith("{") && seg.endsWith("}");
  return seg && !isParam ? seg.toLowerCase() : "(root)";
}

// GET / -> IAuditResultService03.GetAll03
exports.getAll = async (req, res) => {
  try {
    res.json(await AuditResult.find().sort({ auditDate: -1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /errorseries -> IAuditResultService03.GetErrorSeries03
exports.getErrorSeries = async (req, res) => {
  try {
    const runs = await AuditResult.find().sort({ auditDate: 1 }).lean();
    const runDates = new Map(runs.map((r) => [String(r._id), r.auditDate]));

    const history = await ApiauditRunHistory.find({ auditResultId: { $ne: null }, apiRoot: { $ne: null } })
      .select("auditResultId apiRoot isError")
      .lean();

    const groups = new Map();
    for (const h of history) {
      const key = `${h.auditResultId}|${h.apiRoot}`;
      if (!runDates.has(String(h.auditResultId))) continue;
      if (!groups.has(key)) groups.set(key, { auditResultId: h.auditResultId, apiRoot: h.apiRoot, total: 0, errors: 0 });
      const g = groups.get(key);
      g.total++;
      if (h.isError) g.errors++;
    }

    const series = [...groups.values()]
      .map((g) => ({
        auditResultId: g.auditResultId,
        auditDate: runDates.get(String(g.auditResultId)),
        apiRoot: g.apiRoot,
        totalCount: g.total,
        errorCount: g.errors
      }))
      .sort((a, b) => new Date(a.auditDate) - new Date(b.auditDate));

    res.json({
      totalErrors: series.reduce((s, r) => s + r.errorCount, 0),
      totalAudited: series.reduce((s, r) => s + r.totalCount, 0),
      runs: runs.map((r) => ({ id: r._id, auditDate: r.auditDate })),
      series
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /hostseries -> IAuditResultService03.GetHostSeries03
exports.getHostSeries = async (req, res) => {
  try {
    const runs = await AuditResult.find().sort({ auditDate: 1 }).lean();
    const runDates = new Map(runs.map((r) => [String(r._id), r.auditDate]));

    const history = await ApiauditRunHistory.find({ auditResultId: { $ne: null } })
      .select("auditResultId apiauditId hostName apiRoot url")
      .lean();

    const groups = new Map();
    for (const h of history) {
      if (!runDates.has(String(h.auditResultId))) continue;
      const host = h.hostName || h.apiRoot || "(no host)";
      const key = `${h.auditResultId}|${host}`;
      if (!groups.has(key)) groups.set(key, { auditResultId: h.auditResultId, host, endpoints: new Set(), epgs: new Set() });
      const g = groups.get(key);
      g.endpoints.add(String(h.apiauditId));
      g.epgs.add(epgOf(h.url));
    }

    const series = [...groups.values()]
      .map((g) => ({
        auditResultId: g.auditResultId,
        auditDate: runDates.get(String(g.auditResultId)),
        host: g.host,
        epCount: g.endpoints.size,
        epgCount: g.epgs.size
      }))
      .sort((a, b) => new Date(a.auditDate) - new Date(b.auditDate));

    res.json({ runs: runs.map((r) => ({ id: r._id, auditDate: r.auditDate })), series });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:id -> IAuditResultService03.GetById03
exports.getById = async (req, res) => {
  try {
    const item = await AuditResult.findById(req.params.id);
    res.json(item ? [item] : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / -> IAuditResultService03.Create03 (stamps SourceIp from the request, then captures the ticket snapshot)
exports.create = async (req, res) => {
  try {
    const item = await AuditResult.create({ ...req.body, sourceIp: req.ip });

    // Build 220: the ticket queue at the time of this run; never fails the save.
    const auditTicketSnapshotController = require("./auditticketsnapshotcontroller");
    const { error: snapshotError } = await auditTicketSnapshotController._capture(item._id);
    if (snapshotError) console.error(`AuditTicketSnapshot for AuditResult ${item._id} failed: ${snapshotError}`);

    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /:id -> IAuditResultService03.Update03
exports.update = async (req, res) => {
  try {
    const result = await AuditResult.findById(req.params.id);
    if (!result) return res.status(404).end();

    const {
      auditDate, totalApiHosts, apiHostsSecure, apiHostsInsecure, totalApiEndpoints, totalEndpointsSecure,
      totalEndpointsInsecure, auditorId, auditorName, sourceNetwork, notes
    } = req.body;
    Object.assign(result, {
      auditDate, totalApiHosts, apiHostsSecure, apiHostsInsecure, totalApiEndpoints, totalEndpointsSecure,
      totalEndpointsInsecure, auditorId, auditorName, sourceNetwork, notes
    });

    await result.save();
    res.status(202).json({ message: `Updated ID:${result._id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /:id -> IAuditResultService03.Delete03
exports.remove = async (req, res) => {
  try {
    const result = await AuditResult.findById(req.params.id);
    if (!result) return res.status(404).end();
    await result.deleteOne();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
