// services/Globals.js
// Mirrors EnterpriseServices.Globals in the C# APIs.

module.exports = {
  // Set per request by controllers (e.g. the system console sets "ActionsController" / "001")
  ControllerAPIName: null,
  ControllerAPINumber: null,

  // Root URL of this API's parent CockyAuditor (the G4 deployment), no trailing slash
  AUDITOR_URL_ROOT: "https://cockyanalyticsg4-cqfrgacteud3c2h3.westus3-01.azurewebsites.net",

  // How this API identifies itself to the Auditor (letters, digits, '.', '_' or '-'; max 60)
  THIS_API_NAME: "api242",

  // Shared key for the Auditor's POST /api/structureingest (header X-Auditor-Key). Temporary made-up GUID, the
  // same as Auditor:IngestKey in the G4 / G2 appsettings.json; the AUDITOR_INGEST_KEY env var overrides it.
  AUDITOR_INGEST_KEY: process.env.AUDITOR_INGEST_KEY || "f6d759e5-ebdd-4d47-9c90-2bf5e2445f69"
};
