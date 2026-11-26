// Audit/controllers/apiapplication.controller.js — port of analyticsgen4rev2/Audit/apiapplication.controller.cs
// (ApplicationController). GetApplicationApis joins ApplicationApi + Apihost, both ported later in this same
// batch — required lazily (inside the handler) so file-load order between these three doesn't matter.
const Application = require("../models/apiapplications.model");

// GET / -> IApplicationService05.GetAll05
exports.getAll = async (req, res) => {
  try {
    res.json(await Application.find().sort({ applicationName: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:id -> IApplicationService05.GetById05
exports.getById = async (req, res) => {
  try {
    const item = await Application.findById(req.params.id);
    if (!item) return res.status(404).end();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / -> IApplicationService05.Create05
exports.create = async (req, res) => {
  try {
    const item = await Application.create({ ...req.body, createdDate: req.body.createdDate || new Date() });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /:id -> IApplicationService05.Update05
exports.update = async (req, res) => {
  try {
    const item = await Application.findById(req.params.id);
    if (!item) return res.status(404).end();

    const fields = [
      "applicationName", "applicationCode", "description", "ownerName", "ownerEmail", "supportGroup",
      "businessUnit", "environment", "isActive", "inventoryId", "webServerId", "webFarmId", "databaseId",
      "uiCodebase", "apiVendor", "uiHtmlVendor", "uiReactVendor", "osUiHtml", "osUiReact", "osApi",
      "directoryId", "tenantId", "clientId", "objectId", "servicePrincipalId", "entraSyncEnabled", "lastEntraSync"
    ];
    for (const f of fields) if (f in req.body) item[f] = req.body[f];
    item.modifiedDate = new Date();

    await item.save();
    res.status(202).json({ message: `Updated ID:${item._id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /:id -> IApplicationService05.Delete05
exports.remove = async (req, res) => {
  try {
    const item = await Application.findById(req.params.id);
    if (!item) return res.status(404).end();
    await item.deleteOne();
    res.status(202).json({ message: `Deleted ID:${req.params.id}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:id/Apis -> IApplicationService05.GetApplicationApis05
exports.getApplicationApis = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).end();

    const ApplicationApi = require("../models/apiapplicationapi.model");
    const Apihost = require("../models/apihosts.model");

    const links = await ApplicationApi.find({ applicationId: application._id }).lean();
    const hostIds = links.map((l) => l.apiHostId).filter(Boolean);
    const hosts = await Apihost.find({ _id: { $in: hostIds } })
      .select("apiHostName apiHostUrl environment lastAuditDate active")
      .lean();

    res.json({
      id: application._id,
      applicationName: application.applicationName,
      apis: hosts
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
