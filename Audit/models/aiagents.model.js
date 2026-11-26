// Audit/models/aiagents.model.js — port of analyticsgen4rev2/Audit/aiagents.model.cs (Enterprise.Models.AIAgent).
const mongoose = require("mongoose");

const aiAgentSchema = new mongoose.Schema(
  {
    agentName: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    agentType: { type: String, trim: true },
    version: { type: String, trim: true },

    instanceId: { type: String, required: true, trim: true },
    tenantId: { type: String, trim: true },

    deviceAssociated: { type: Number },
    region: { type: String, trim: true },
    ipAddress: { type: String, trim: true },
    hostname: { type: String, trim: true },

    ownerName: { type: String, trim: true },
    ownerEmail: { type: String, trim: true },
    supportContact: { type: String, trim: true },

    automationTo: { type: String, trim: true },
    controllerName: { type: String, trim: true },
    serviceName: { type: String, trim: true },

    authenticationType: { type: String, trim: true },
    runsAsUser: { type: String, trim: true },
    securityRole: { type: String, trim: true },

    status: { type: String, trim: true, default: "Active" },
    lastExecution: { type: Date },
    lastHeartbeat: { type: Date },

    totalExecutions: { type: Number },
    totalErrors: { type: Number },

    modelProvider: { type: String, trim: true },
    modelName: { type: String, trim: true },
    promptTemplate: { type: String },

    apiKeyStored: { type: Boolean },
    internetAccessEnabled: { type: Boolean },
    canWriteToDatabase: { type: Boolean },
    canExecuteAutomation: { type: Boolean },
    canSendEmail: { type: Boolean },
    canGenerateFiles: { type: Boolean },
    canCallExternalApis: { type: Boolean },

    riskLevel: { type: String, trim: true },
    dataClassification: { type: String, trim: true },

    notes: { type: String },

    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date }
  },
  { collection: "AIAgents" }
);

module.exports = mongoose.models.AIAgent || mongoose.model("AIAgent", aiAgentSchema);
