// middleware/fusionAuth.js
//
// Express port of the C# EnterpriseServices.FusionAuth helper
// (analyticsgen4rev2/ServicesGlobals/FusionAuth.cs), which every analyticsgen4rev2/Audit controller wraps its
// endpoints in. Every real endpoint is reached at its original path + /:apiusername/:apipassword/:token,
// checked by the same rule SystemConsoleRoutes.js already uses (services/ValidationRoutines.validateRequest).
// The original (credential-less) path is kept mounted too, answering FusionIdentity Error 1002 with an example
// of the secured route, instead of a bare 404.
//
// Status code: the C# comment says FusionAuth answers 400, but SystemConsoleRoutes.js (the only other Node
// caller of this same ValidationRoutines.validateRequest) already answers 401, which also matches the
// `.Produces(401)` annotation on every C# Audit endpoint. Kept at 401 here for consistency with both.
const ValidationRoutines = require("../services/ValidationRoutines");

const CREDENTIALS = "/:apiusername/:apipassword/:token";

// "/" -> "/:apiusername/:apipassword/:token", "/:id" -> "/:id/:apiusername/:apipassword/:token"
function secure(pattern) {
  const trimmed = pattern.endsWith("/") && pattern !== "/" ? pattern.slice(0, -1) : pattern;
  return (trimmed === "/" ? "" : trimmed) + CREDENTIALS;
}

// Route middleware for a secured path: validates {apiusername}/{apipassword}/{token} before the handler runs.
async function fusionAuth(req, res, next) {
  const { apiusername, apipassword, token } = req.params;
  try {
    const refused = await ValidationRoutines.validateRequest(apiusername, apipassword, token);
    if (refused) return res.status(401).json(refused);
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Mounts a hint handler at `pattern` (the original, credential-less path) that always answers 1002 with an
// example of the real secured route, so a call without credentials gets a helpful 400 instead of a 404.
function credentialHint(router, groupPath, method, pattern) {
  const base = groupPath.endsWith("/") ? groupPath.slice(0, -1) : groupPath;
  const example = (base + secure(pattern)).replace(/:([A-Za-z0-9_]+)/g, "{$1}");
  router[method.toLowerCase()](pattern, (req, res) =>
    res.status(400).json({
      errorCode: 1002,
      error: "FusionIdentity Error 1002: apiusername, apipassword and token required",
      example
    })
  );
}

module.exports = { fusionAuth, secure, credentialHint, CREDENTIALS };
