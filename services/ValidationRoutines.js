// services/ValidationRoutines.js
// Node port of EnterpriseServices.ValidationRoutines (G4 ServicesGlobals/NewSiteValidationForExtendedAPIs.cs):
// the credential check for every /:apiusername/:apipassword/:token route.
//
// The rule, in order:
//   1. Auditor tokens: a token starting with "zzaudit" has no session. It passes when apiusername / apipassword
//      match an enabled User (user.apiusername / user.apipassword, isDisabled != 1), otherwise 1005.
//   2. Pilot mode (PILOT_MODE = true): every other call passes.
//   3. Sessions: the token must belong to an open UserSession (sessioncomplete != 1) whose user has this
//      apiusername / apipassword (1003 / 1004 / 1002 / 1005), and the token must be a valid JWT (1001).
//
// Differences from the C# version:
//   - PILOT_MODE is false here (the G4 has it true). This API is public on Render and the console can write
//     to the database, so sessions are enforced. Flip it to true to match the G4's pilot behaviour.
//   - api242's UserSession has no apiusername / apipassword copy, so the session is joined to its User
//     (useridasstring = User._id, set by authController.createSessionAndToken).

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const UserSession = require("../models/UserSession");

const PILOT_MODE = false;
const AUDIT_TOKEN_PREFIX = "zzaudit";

function isAuditToken(token) {
  return typeof token === "string" && token.startsWith(AUDIT_TOKEN_PREFIX);
}

function error(errorCode, message) {
  return { errorCode, error: `FusionIdentity Error ${errorCode}: ${message}` };
}

const invalidCredentials = () => error(1005, "invalid credentials");

function blank(value) {
  return typeof value !== "string" || value.trim() === "";
}

// Auditor: the API login belongs to an enabled user.
async function auditLoginMatches(apiusername, apipassword) {
  if (blank(apiusername) || blank(apipassword)) return false;
  const user = await User.findOne({
    apiusername,
    apipassword,
    isDisabled: { $ne: 1 }
  })
    .select("_id")
    .lean();
  return !!user;
}

// Everyone else: the token is an open session belonging to the user with this API login.
async function sessionMatches(apiusername, apipassword, token) {
  if (blank(apiusername) || blank(apipassword) || blank(token)) return false;

  const session = await UserSession.findOne({ token, sessioncomplete: { $ne: 1 } }).lean();
  if (!session) return false;

  const owner = [];
  if (session.useridasstring && /^[a-f0-9]{24}$/i.test(session.useridasstring)) owner.push({ _id: session.useridasstring });
  if (session.userid) owner.push({ userid: session.userid }, { id: session.userid });
  if (owner.length === 0) return false;

  const user = await User.findOne({
    $or: owner,
    apiusername,
    apipassword,
    isDisabled: { $ne: 1 }
  })
    .select("_id")
    .lean();
  return !!user;
}

// Same JWT check authController.logout uses.
function validateToken(token) {
  try {
    jwt.verify(token, process.env.JWT_KEY, {
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE
    });
    return "Valid";
  } catch (err) {
    return err.message;
  }
}

// null = allowed; otherwise the FusionIdentity error object to return.
async function validateRequest(apiusername, apipassword, token) {
  if (isAuditToken(token)) {
    return (await auditLoginMatches(apiusername, apipassword)) ? null : invalidCredentials();
  }

  if (PILOT_MODE) return null;

  if (blank(apiusername)) return error(1003, "API username required");
  if (blank(apipassword)) return error(1004, "API password required");
  if (blank(token)) return error(1002, "token required");

  if (!(await sessionMatches(apiusername, apipassword, token))) return invalidCredentials();

  const tokenValidation = validateToken(token);
  if (tokenValidation !== "Valid") return error(1001, tokenValidation);

  return null;
}

// true/false form of validateRequest (same rule).
async function validate(apiusername, apipassword, token) {
  return (await validateRequest(apiusername, apipassword, token)) === null;
}

module.exports = {
  PILOT_MODE,
  AUDIT_TOKEN_PREFIX,
  isAuditToken,
  validateRequest,
  validate
};
