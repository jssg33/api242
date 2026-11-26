// Audit/controllers/apiauditcontroller.js
// Node port of analyticsgen4rev2/Audit/apiauditcontroller.cs (ApiAuditEndpoints). Create and Update both also
// write an append-only ApiauditRunHistory row (Apiaudit itself is overwritten in place and keeps no history).
const Apiaudit = require("../models/apiaudit.model");
const ApiauditRunHistory = require("../models/apiauditrunhistory.model");

function isErrorStatus(statusCode) {
  return statusCode == null || statusCode === 0 || statusCode >= 400; // 0 = no reply
}

function historyRowFrom(audit) {
  return {
    apiauditId: audit._id,
    auditResultId: audit.auditResultId,
    apiRoot: audit.apiRoot,
    hostName: audit.hostName,
    url: audit.url,
    endpointType: audit.endpointType,
    statusCode: audit.lastStatusCode,
    responseMs: audit.lastResponseMs,
    isError: isErrorStatus(audit.lastStatusCode),
    auditDate: audit.lastAuditDate || new Date()
  };
}

// GET / -> IApiauditService04.GetAll04
exports.getAll = async (req, res) => {
  try {
    res.json(await Apiaudit.find());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:id -> IApiauditService04.GetById04
exports.getById = async (req, res) => {
  try {
    const audit = await Apiaudit.findById(req.params.id);
    res.json(audit ? [audit] : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / -> IApiauditService04.Create04
// apiauditrunhistory.apiauditId needs the real _id, so the history insert follows the audit's own save, like
// the C# (which needs a second round trip for the same reason: an identity column isn't populated until insert).
exports.create = async (req, res) => {
  try {
    const audit = await Apiaudit.create(req.body);
    await ApiauditRunHistory.create(historyRowFrom(audit));
    res.status(201).json({ message: `Created ID:${audit._id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /:id -> IApiauditService04.Update04
exports.update = async (req, res) => {
  try {
    const audit = await Apiaudit.findById(req.params.id);
    if (!audit) return res.status(404).end();

    const fields = [
      "auditorId", "description", "family", "url", "apiRoot", "type", "servicesAttached", "servicesJson",
      "ipv4Address", "ipv6Address", "hostName", "hasProxy", "proxyEntranceV4", "proxyEntranceV6", "proxyType",
      "databaseFramework", "databaseConnectionString", "databaseType", "hasAuthEnabled", "authType",
      "auditorName", "auditorEmail", "auditorEmployeeId", "auditorDepartment", "businessUnitName",
      "businessUnitOwnerId", "primaryPort", "secondaryPort", "secondaryV4", "secondaryV6", "fqdn", "osType",
      "frameworkVersion", "groupId", "groupDescription", "buildingId", "buildingName", "techContactName",
      "techContactEmail", "techContactFax", "techContactPhone", "securityEmail", "securityPhone", "dbaId",
      "dbaName", "hashType", "endpointType", "sslSupported", "httpSupported", "httpPortV4", "httpPortV6",
      "corsPath", "allowedRanges", "deniedRanges", "lastAuditDate", "isActive", "environment",
      "applicationName", "sourceRepository", "azureSubscriptionId", "azureResourceGroup", "apiHostId",
      "auditResultId", "endpointSecure", "swaggerOperationId", "swaggerVersion", "notes",
      "securityClassification", "lastStatusCode", "lastResponseMs", "isPractical", "isStrict", "authEnforced",
      "corsRestricted", "ipRestricted", "authCheckResult", "authCheckDate", "isDeleted", "preLogin"
    ];
    for (const f of fields) if (f in req.body) audit[f] = req.body[f];
    audit.modifiedDate = new Date();

    await audit.save();
    await ApiauditRunHistory.create(historyRowFrom(audit));

    res.status(202).json({ message: `Updated ID:${audit._id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /:id -> IApiauditService04.Delete04
exports.remove = async (req, res) => {
  try {
    const audit = await Apiaudit.findById(req.params.id);
    if (!audit) return res.status(404).end();
    await audit.deleteOne();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
