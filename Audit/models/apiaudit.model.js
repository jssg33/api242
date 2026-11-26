// Audit/models/apiaudit.model.js
// Port of analyticsgen4rev2/Audit/apiaudit.model.cs (Enterprise.Models.Apiaudit): the live inventory row for one
// endpoint, overwritten in place on every re-audit (history lives in ApiauditRunHistory, see
// Audit/models/apiauditrunhistory.model.js).
const mongoose = require("mongoose");

const apiauditSchema = new mongoose.Schema(
  {
    auditorId: { type: Number, required: true },

    description: { type: String, trim: true },
    family: { type: String, trim: true },
    url: { type: String, trim: true },
    apiRoot: { type: String, trim: true },
    type: { type: String, trim: true }, // SqlOnly, NetworkEmbedded, ConsoleApp

    servicesAttached: { type: Boolean, default: false },
    servicesJson: { type: String },

    ipv4Address: { type: String, trim: true },
    ipv6Address: { type: String, trim: true },
    hostName: { type: String, trim: true },

    hasProxy: { type: Boolean, default: false },
    proxyEntranceV4: { type: String, trim: true },
    proxyEntranceV6: { type: String, trim: true },
    proxyType: { type: String, trim: true },

    databaseFramework: { type: String, trim: true },
    databaseConnectionString: { type: String, trim: true },
    databaseType: { type: String, trim: true },

    hasAuthEnabled: { type: Boolean, default: false },
    authType: { type: String, trim: true },

    auditorName: { type: String, trim: true },
    auditorEmail: { type: String, trim: true },
    auditorEmployeeId: { type: String, trim: true },
    auditorDepartment: { type: String, trim: true },

    businessUnitName: { type: String, trim: true },
    businessUnitOwnerId: { type: Number, default: 0 },

    primaryPort: { type: Number },
    secondaryPort: { type: Number },
    secondaryV4: { type: String, trim: true },
    secondaryV6: { type: String, trim: true },

    fqdn: { type: String, trim: true },
    osType: { type: String, trim: true },
    frameworkVersion: { type: String, trim: true },

    groupId: { type: Number, default: 0 },
    groupDescription: { type: String, trim: true },

    buildingId: { type: Number, default: 0 },
    buildingName: { type: String, trim: true },

    techContactName: { type: String, trim: true },
    techContactEmail: { type: String, trim: true },
    techContactFax: { type: String, trim: true },
    techContactPhone: { type: String, trim: true },

    securityEmail: { type: String, trim: true },
    securityPhone: { type: String, trim: true },

    dbaId: { type: Number, default: 0 },
    dbaName: { type: String, trim: true },

    hashType: { type: String, trim: true },
    endpointType: { type: String, trim: true }, // GET POST PUT DELETE

    sslSupported: { type: Boolean, default: false },
    httpSupported: { type: Boolean, default: false },
    httpPortV4: { type: Number },
    httpPortV6: { type: Number },

    corsPath: { type: String, trim: true },
    allowedRanges: { type: String },
    deniedRanges: { type: String },

    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date },
    lastAuditDate: { type: Date },

    isActive: { type: Boolean, default: true },

    environment: { type: String, trim: true }, // Dev/Test/UAT/Prod
    applicationName: { type: String, trim: true },
    sourceRepository: { type: String, trim: true },

    azureSubscriptionId: { type: String, trim: true },
    azureResourceGroup: { type: String, trim: true },
    apiHostId: { type: Number },
    auditResultId: { type: Number },
    endpointSecure: { type: Boolean, default: false },
    swaggerOperationId: { type: String, trim: true },
    swaggerVersion: { type: String, trim: true },
    notes: { type: String },
    securityClassification: { type: String, trim: true },
    lastStatusCode: { type: Number },
    lastResponseMs: { type: Number },

    isPractical: { type: Boolean, default: false },
    isStrict: { type: Boolean, default: false },

    authEnforced: { type: Boolean },
    corsRestricted: { type: Boolean },
    ipRestricted: { type: Boolean },
    authCheckResult: { type: String, maxlength: 400 },
    authCheckDate: { type: Date },
    isDeleted: { type: Number, default: 0 },
    preLogin: { type: Number, default: 0 }
  },
  { collection: "Apiaudit" }
);

module.exports = mongoose.models.Apiaudit || mongoose.model("Apiaudit", apiauditSchema);
