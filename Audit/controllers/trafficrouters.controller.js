// Audit/controllers/trafficrouters.controller.js — port of analyticsgen4rev2/Audit/trafficrouters.controller.cs
// (TrafficRouterController).
const TrafficRouter = require("../models/trafficrouter.model");
const Apihost = require("../models/apihosts.model");

// GET / -> ITrafficRouterService24.GetAll24
exports.getAll = async (req, res) => {
  try {
    res.json(await TrafficRouter.find().sort({ routerName: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:id -> ITrafficRouterService24.GetById24
exports.getById = async (req, res) => {
  try {
    const router = await TrafficRouter.findById(req.params.id);
    if (!router) return res.status(404).end();
    res.json(router);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:id/hosts -> ITrafficRouterService24.GetHostsForRouter24
exports.getHostsForRouter = async (req, res) => {
  try {
    const router = await TrafficRouter.findById(req.params.id);
    if (!router) return res.status(404).end();

    const hosts = await Apihost.find({ trafficRouterId: req.params.id }).sort({ apiHostName: 1 });
    res.json({ router, hosts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / -> ITrafficRouterService24.Create24
exports.create = async (req, res) => {
  try {
    const router = await TrafficRouter.create({ ...req.body, createdDate: new Date() });
    res.json(router);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /:id -> ITrafficRouterService24.Update24
exports.update = async (req, res) => {
  try {
    const router = await TrafficRouter.findById(req.params.id);
    if (!router) return res.status(404).end();

    const { routerName, routerType, routingMethod, subscriptionId, resourceGroupName, azureResourceId, isEnabled, parentTrafficRouterId } = req.body;
    Object.assign(router, { routerName, routerType, routingMethod, subscriptionId, resourceGroupName, azureResourceId, isEnabled, parentTrafficRouterId });
    router.modifiedDate = new Date();

    await router.save();
    res.json(router);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /:id -> ITrafficRouterService24.Delete24
exports.remove = async (req, res) => {
  try {
    const router = await TrafficRouter.findById(req.params.id);
    if (!router) return res.status(404).end();
    await router.deleteOne();
    res.json({ success: true, message: "Traffic Router deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /assignhost/:routerId/:hostId -> ITrafficRouterService24.AssignHost24
exports.assignHost = async (req, res) => {
  try {
    const host = await Apihost.findById(req.params.hostId);
    if (!host) return res.status(404).end();
    host.trafficRouterId = req.params.routerId;
    await host.save();
    res.json(host);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST /removehost/:hostId -> ITrafficRouterService24.RemoveHost24
exports.removeHost = async (req, res) => {
  try {
    const host = await Apihost.findById(req.params.hostId);
    if (!host) return res.status(404).end();
    host.trafficRouterId = null;
    await host.save();
    res.json(host);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /apihosts/:routerId -> ITrafficRouterService24.GetApiHosts24
exports.getApiHosts = async (req, res) => {
  try {
    const hosts = await Apihost.find({ trafficRouterId: req.params.routerId }).sort({ apiHostName: 1 });
    res.json(hosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
