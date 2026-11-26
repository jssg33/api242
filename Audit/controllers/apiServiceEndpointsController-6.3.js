// Audit/controllers/apiServiceEndpointsController-6.3.js — port of
// analyticsgen4rev2/Audit/apiServiceEndpointsController-6.3.cs (ApiServiceEndpointsController). ApiService is
// required lazily (inside each handler) since it's ported later in this same batch (apiservices.controller.js).
const ApiServiceEndpoint = require("../models/apiserviceEndpoint-model-6.3");
const Apiaudit = require("../models/apiaudit.model");

// GET /by-service/:serviceId -> GetEndpointsForService
exports.getByService = async (req, res) => {
  try {
    const links = await ApiServiceEndpoint.find({ serviceId: req.params.serviceId }).lean();
    const endpoints = await Apiaudit.find({ _id: { $in: links.map((l) => l.apiAuditId) } })
      .select("apiHostId url endpointType family applicationName environment")
      .lean();
    const byId = new Map(endpoints.map((e) => [String(e._id), e]));

    const rows = links
      .map((l) => {
        const ep = byId.get(String(l.apiAuditId));
        if (!ep) return null;
        return {
          linkId: l._id,
          serviceId: l.serviceId,
          apiAuditId: l.apiAuditId,
          apiHostId: ep.apiHostId,
          url: ep.url,
          endpointType: ep.endpointType,
          family: ep.family,
          applicationName: ep.applicationName,
          environment: ep.environment
        };
      })
      .filter(Boolean)
      .sort((a, b) => String(a.url).localeCompare(String(b.url)));

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /by-endpoint/:apiAuditId -> GetServicesForEndpoint
exports.getByEndpoint = async (req, res) => {
  try {
    const ApiService = require("../models/apiservices.model");
    const links = await ApiServiceEndpoint.find({ apiAuditId: req.params.apiAuditId }).lean();
    const services = await ApiService.find({ _id: { $in: links.map((l) => l.serviceId) } })
      .select("serviceName serviceType apiHostId")
      .lean();
    const byId = new Map(services.map((s) => [String(s._id), s]));

    const rows = links
      .map((l) => {
        const svc = byId.get(String(l.serviceId));
        if (!svc) return null;
        return {
          linkId: l._id,
          serviceId: l.serviceId,
          apiAuditId: l.apiAuditId,
          serviceName: svc.serviceName,
          serviceType: svc.serviceType,
          apiHostId: svc.apiHostId
        };
      })
      .filter(Boolean)
      .sort((a, b) => String(a.serviceName).localeCompare(String(b.serviceName)));

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / -> CreateServiceEndpointLink (idempotent; rejects cross-host links)
exports.create = async (req, res) => {
  try {
    const ApiService = require("../models/apiservices.model");
    const { serviceId, apiAuditId } = req.body;

    const svc = await ApiService.findById(serviceId);
    if (!svc) return res.status(404).json({ error: `Service ${serviceId} not found.` });

    const ep = await Apiaudit.findById(apiAuditId);
    if (!ep) return res.status(404).json({ error: `Endpoint ${apiAuditId} not found.` });

    if (svc.apiHostId != null && ep.apiHostId != null && svc.apiHostId !== ep.apiHostId) {
      return res.status(400).json({
        error: `Endpoint ${ep._id} is on host ${ep.apiHostId}, service ${svc._id} is on host ${svc.apiHostId}.`
      });
    }

    const existing = await ApiServiceEndpoint.findOne({ serviceId, apiAuditId });
    if (existing) return res.json(existing);

    const link = await ApiServiceEndpoint.create({ serviceId, apiAuditId, apiHostId: svc.apiHostId });
    res.status(201).json(link);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST /service/:serviceId/set -> SetServiceEndpoints (bulk replace)
exports.setForService = async (req, res) => {
  try {
    const ApiService = require("../models/apiservices.model");
    const { serviceId } = req.params;
    const ids = [...new Set(req.body.apiAuditIds || [])];

    const svc = await ApiService.findById(serviceId);
    if (!svc) return res.status(404).json({ error: `Service ${serviceId} not found.` });

    if (svc.apiHostId != null && ids.length > 0) {
      const offHost = await Apiaudit.find({ _id: { $in: ids }, apiHostId: { $ne: svc.apiHostId } }).select("_id").lean();
      if (offHost.length) {
        return res.status(400).json({
          error: `Endpoints not on service host ${svc.apiHostId}: ${offHost.map((e) => e._id).join(", ")}`
        });
      }
    }

    const current = await ApiServiceEndpoint.find({ serviceId });
    const toRemove = current.filter((l) => !ids.includes(String(l.apiAuditId)));
    await ApiServiceEndpoint.deleteMany({ _id: { $in: toRemove.map((l) => l._id) } });

    const have = new Set(current.map((l) => String(l.apiAuditId)));
    const toAdd = ids.filter((id) => !have.has(id));
    if (toAdd.length) {
      await ApiServiceEndpoint.insertMany(toAdd.map((apiAuditId) => ({ serviceId, apiAuditId, apiHostId: svc.apiHostId })));
    }

    res.json({ serviceId, linked: ids, removed: toRemove.map((l) => l.apiAuditId) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /:id -> DeleteServiceEndpointLink
exports.removeById = async (req, res) => {
  try {
    const link = await ApiServiceEndpoint.findById(req.params.id);
    if (!link) return res.status(404).end();
    await link.deleteOne();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /pair -> DeleteServiceEndpointPair (?serviceId=&apiAuditId=)
exports.removePair = async (req, res) => {
  try {
    const { serviceId, apiAuditId } = req.query;
    const link = await ApiServiceEndpoint.findOne({ serviceId, apiAuditId });
    if (!link) return res.status(404).end();
    await link.deleteOne();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
