// Audit/controllers/aiagents.controller.js — port of analyticsgen4rev2/Audit/aiagents.controller.cs (AIAgentEndpoints).
const AIAgent = require("../models/aiagents.model");

const UPDATABLE = [
  "agentName", "description", "agentType", "version", "instanceId", "tenantId", "deviceAssociated", "region",
  "ipAddress", "hostname", "ownerName", "ownerEmail", "supportContact", "automationTo", "controllerName",
  "serviceName", "authenticationType", "runsAsUser", "securityRole", "status", "lastExecution", "lastHeartbeat",
  "totalExecutions", "totalErrors", "modelProvider", "modelName", "promptTemplate", "apiKeyStored",
  "internetAccessEnabled", "canWriteToDatabase", "canExecuteAutomation", "canSendEmail", "canGenerateFiles",
  "canCallExternalApis", "riskLevel", "dataClassification", "notes"
];

// GET / -> IAIAgentService17.GetAll17
exports.getAll = async (req, res) => {
  try {
    res.json(await AIAgent.find().sort({ agentName: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /:id -> IAIAgentService17.GetById17
exports.getById = async (req, res) => {
  try {
    const agent = await AIAgent.findById(req.params.id);
    res.json(agent ? [agent] : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /active -> IAIAgentService17.GetActive17
exports.getActive = async (req, res) => {
  try {
    res.json(await AIAgent.find({ status: "Active" }).sort({ agentName: 1 }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST / -> IAIAgentService17.Create17
exports.create = async (req, res) => {
  try {
    const agent = await AIAgent.create({ ...req.body, createdDate: new Date() });
    res.status(201).json({ message: `Created ID:${agent._id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /:id -> IAIAgentService17.Update17
exports.update = async (req, res) => {
  try {
    const agent = await AIAgent.findById(req.params.id);
    if (!agent) return res.status(404).end();

    for (const f of UPDATABLE) if (f in req.body) agent[f] = req.body[f];
    agent.updatedDate = new Date();

    await agent.save();
    res.status(202).json({ message: `Updated ID:${agent._id}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /:id -> IAIAgentService17.Delete17
exports.remove = async (req, res) => {
  try {
    const agent = await AIAgent.findById(req.params.id);
    if (!agent) return res.status(404).end();
    await agent.deleteOne();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
