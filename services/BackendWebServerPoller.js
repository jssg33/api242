// services/BackendWebServerPoller.js
// Node port of the C# BackendWebServerPoller (G4 ControllersGridSystemActions/BackendPoller.cs), option 9.
// For every active proxy-slave WebServer, tries http:// and https:// (10 s timeout, any certificate accepted, as in
// the C# version) and reports whether each answered and with what status code.

const http = require("http");
const https = require("https");
const WebServer = require("../models/WebServer");

function probe(url) {
  return new Promise((resolve) => {
    const client = url.startsWith("https:") ? https : http;
    const req = client.get(url, { timeout: 10000, rejectUnauthorized: false }, (res) => {
      res.resume(); // discard the body
      resolve({ valid: true, statusCode: res.statusCode });
    });
    req.on("timeout", () => req.destroy(new Error("timeout")));
    req.on("error", () => resolve({ valid: false, statusCode: null }));
  });
}

async function pollBackendServers() {
  const servers = await WebServer.find({ isProxySlave: true, active: true }).sort({ serverName: 1 }).lean();

  const results = [];
  for (const server of servers) {
    const host = server.hostname && server.hostname.trim() ? server.hostname : server.ipAddress;

    let httpResult = { valid: false, statusCode: null };
    let httpsResult = { valid: false, statusCode: null };

    if (host && host.trim()) {
      [httpResult, httpsResult] = await Promise.all([probe(`http://${host}`), probe(`https://${host}`)]);
    }

    results.push({
      serverName: server.serverName,
      hostname: server.hostname,
      ipAddress: server.ipAddress,
      httpValid: httpResult.valid,
      httpsValid: httpsResult.valid,
      httpStatusCode: httpResult.statusCode,
      httpsStatusCode: httpsResult.statusCode,
      auditDate: new Date().toISOString()
    });
  }

  return results;
}

module.exports = { pollBackendServers };
