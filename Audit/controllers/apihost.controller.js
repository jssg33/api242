// Audit/controllers/apihost.controller.js — port of analyticsgen4rev2/Audit/apihost.controller.cs (ApihostEndpoints).
const Apihost = require("../models/apihosts.model");

const UPDATABLE = [
  "apiHostName", "apiHostUrl", "swaggerUsername", "swaggerPassword", "isSecure", "lastAuditDate", "lastAuditId",
  "active", "auditorId", "family", "ipv4Address", "ipv6Address", "hostName", "hasProxy", "proxyEntranceV4",
  "proxyEntranceV6", "proxyType", "databaseFramework", "databaseConnectionString", "databaseType",
  "businessUnitName", "businessUnitOwnerId", "primaryPort", "secondaryPort", "secondaryV4", "secondaryV6",
  "fqdn", "osType", "frameworkVersion", "groupId", "groupDescription", "buildingId", "buildingName",
  "techContactName", "techContactEmail", "techContactFax", "techContactPhone", "securityEmail", "securityPhone",
  "dbaId", "dbaName", "hashType", "sslSupported", "httpSupported", "httpPortV4", "httpPortV6", "corsPath",
  "allowedRanges", "deniedRanges", "isActive", "environment", "applicationName", "sourceRepository",
  "azureSubscriptionId", "azureResourceGroup", "datacenterId", "apiVendorHostId", "securityClassification",
  "inventoryId", "servicePath", "serviceId", "serviceName", "isDeleted"
];
// Only set when the caller actually sent a value, like the C#'s `if (input.X != null)` guards.
const OPTIONAL = ["platformName", "platformHttps", "platformCors", "platformAttestedDate", "platformAttestedBy"];

// GET / -> IApihostService09.GetAll09
exports.getAll = async (req, res) => {
  try {
    res.json(await Apihost.find());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:id -> IApihostService09.GetById09
exports.getById = async (req, res) => {
  try {
    const host = await Apihost.findById(req.params.id);
    res.json(host ? [host] : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / -> IApihostService09.Create09
exports.create = async (req, res) => {
  try {
    const host = await Apihost.create(req.body);
    res.status(201).json(host);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /:id -> IApihostService09.Update09
exports.update = async (req, res) => {
  try {
    const host = await Apihost.findById(req.params.id);
    if (!host) return res.status(404).end();

    for (const f of UPDATABLE) if (f in req.body) host[f] = req.body[f];
    for (const f of OPTIONAL) if (req.body[f] != null) host[f] = req.body[f];

    await host.save();
    res.status(202).json(host);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /:id -> IApihostService09.Delete09
exports.remove = async (req, res) => {
  try {
    const host = await Apihost.findById(req.params.id);
    if (!host) return res.status(404).end();
    await host.deleteOne();
    res.json({ message: "Apihost deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /Validate/:id -> IApihostService09.GetValidated09
exports.getValidated = async (req, res) => {
  try {
    const host = await Apihost.findById(req.params.id);
    if (!host) return res.status(404).end();
    res.json(host);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /Inventory -> IApihostService09.GetInventory09
exports.getInventory = async (req, res) => {
  try {
    res.json(await Apihost.find({ isActive: true }).sort({ apiHostName: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /AuditTargets -> IApihostService09.GetAuditTargets09
exports.getAuditTargets = async (req, res) => {
  try {
    const hosts = await Apihost.find({ active: true })
      .select("apiHostName apiHostUrl inventoryId serviceId serviceName securityClassification environment")
      .lean();
    res.json(hosts.map((h) => ({ id: h._id, ...h })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
