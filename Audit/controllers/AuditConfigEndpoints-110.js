// Audit/controllers/AuditConfigEndpoints-110.js
// Port of analyticsgen4rev2/Audit/AuditConfigEndpoints-110.cs (AuditConfigEndpoints). PUT copies only the
// fields present in the body (others are left as they are); too-long values answer 400 naming the field,
// mirroring the C#'s Limits/TooLong() check instead of relying on a database truncation error.
const AuditConfig = require("../models/AuditConfigEndpoints-110.model");

const LIMITS = {
  description: 500, region: 100, shard: 100, instance: 100, root1: 50, root2: 50, ipv4: 45, ipv6: 100, ipv42: 45, ipv62: 100
};

function clean(v) {
  return typeof v === "string" && v.trim() ? v.trim() : v == null || v === "" ? null : v;
}

// null = fine; otherwise the 400 payload to send.
function tooLong(doc) {
  for (const [field, max] of Object.entries(LIMITS)) {
    const v = doc[field];
    if (v != null && String(v).length > max) {
      return { error: `${field} is longer than ${max} characters.`, field, max };
    }
  }
  return null;
}

// GET / -> IAuditConfigService18.GetAll18
exports.getAll = async (req, res) => {
  try {
    const rows = await AuditConfig.find().sort({ region: 1, shard: 1, instance: 1, _id: 1 }).lean();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:id -> IAuditConfigService18.GetById18
exports.getById = async (req, res) => {
  try {
    const row = await AuditConfig.findById(req.params.id).lean();
    res.json(row ? [row] : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /shard/:region/:shard -> IAuditConfigService18.GetShard18 (one grid cell; trimmed, case-sensitive match)
exports.getShard = async (req, res) => {
  try {
    const region = req.params.region.trim();
    const shard = req.params.shard.trim();
    const rows = await AuditConfig.find({ region, shard }).sort({ instance: 1, _id: 1 }).lean();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / -> IAuditConfigService18.Create18
exports.create = async (req, res) => {
  try {
    const input = { ...req.body };
    delete input._id;
    for (const field of Object.keys(LIMITS)) if (field in input) input[field] = clean(input[field]);

    const prob = tooLong(input);
    if (prob) return res.status(400).json(prob);

    const saved = await AuditConfig.create(input);
    res.json({ success: true, id: saved._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /:id -> IAuditConfigService18.Update18
exports.update = async (req, res) => {
  try {
    const existing = await AuditConfig.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: `No AuditConfig with Id ${req.params.id}.` });

    for (const field of Object.keys(LIMITS)) {
      if (field in req.body) existing[field] = clean(req.body[field]);
    }

    const prob = tooLong(existing);
    if (prob) return res.status(400).json(prob);

    await existing.save();
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /:id -> IAuditConfigService18.Delete18
exports.remove = async (req, res) => {
  try {
    const existing = await AuditConfig.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: `No AuditConfig with Id ${req.params.id}.` });
    await existing.deleteOne();
    res.json({ success: true, id: req.params.id, message: "AuditConfig deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
