// Audit/controllers/apiauditrunhistorycontroller.js
// Node port of analyticsgen4rev2/Audit/apiauditrunhistorycontroller.cs (ApiauditRunHistoryEndpoints).
// Read-only: every row is written as a secondary insert by Apiaudit's own save (see apiauditcontroller).
const ApiauditRunHistory = require("../models/apiauditrunhistory.model");

// GET / -> IApiauditRunHistoryService07.GetAll07
exports.getAll = async (req, res) => {
  try {
    res.json(await ApiauditRunHistory.find().sort({ auditDate: -1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /endpoint/:apiauditId -> IApiauditRunHistoryService07.GetByEndpoint07
exports.getByEndpoint = async (req, res) => {
  try {
    const rows = await ApiauditRunHistory.find({ apiauditId: Number(req.params.apiauditId) }).sort({ auditDate: -1 });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /run/:auditResultId -> IApiauditRunHistoryService07.GetByRun07
exports.getByRun = async (req, res) => {
  try {
    const rows = await ApiauditRunHistory.find({ auditResultId: Number(req.params.auditResultId) }).sort({ apiRoot: 1 });
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
