// Audit/controllers/InterfaceAudit.js
// Port of analyticsgen4rev2/Audit/InterfaceAudit.cs (EnterpriseServices.InterfaceAuditService). The C# version
// reflects over .NET interfaces in the "Enterprise" namespace; Node has no equivalent to reflect over, so this
// ports the *intent* instead — walk Express's own registered routes and upsert one ApiInterfacesAudit row per
// (path, httpMethod), the Node analogue of "one row per interface per method". Not a C# controller (no
// Map*Endpoints there either), so this has no matching route file — it's a plain helper other code can call,
// e.g. from a startup script or a CLI task, the way the C# was presumably invoked outside of HTTP.
const ApiInterfacesAudit = require("../models/apiauditinterfaces.model");

// Recursively walks an Express app's/router's internal stack (Express 4/5 shape) collecting {method, path}.
function collectRoutes(stack, prefix, out) {
  for (const layer of stack || []) {
    if (layer.route) {
      const path = prefix + (layer.route.path || "");
      const methods = Object.keys(layer.route.methods || {}).filter((m) => layer.route.methods[m]);
      for (const method of methods) out.push({ method: method.toUpperCase(), path });
    } else if (layer.name === "router" && layer.handle && layer.handle.stack) {
      const nested = layer.regexp && layer.regexp.fast_slash ? "" : (layer.path || "");
      collectRoutes(layer.handle.stack, prefix + nested, out);
    }
  }
}

// Returns { processed } like the C#'s record count. app is an Express application (app._router.stack).
async function auditInterfaces(app) {
  let processed = 0;
  const routes = [];
  collectRoutes(app._router && app._router.stack, "", routes);

  for (const { method, path } of routes) {
    const existing = await ApiInterfacesAudit.findOne({ route: path, httpMethod: method, interfaceName: path });

    if (!existing) {
      await ApiInterfacesAudit.create({
        route: path,
        httpMethod: method,
        interfaceName: path,
        methodName: method,
        isImplemented: true,
        isRegistered: true,
        discoveredDate: new Date()
      });
    } else {
      existing.discoveredDate = new Date();
      await existing.save();
    }
    processed++;
  }

  return { processed };
}

module.exports = { auditInterfaces };
