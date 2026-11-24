// services/SqlAzureSecurityAudit.js
// MongoDB version of the G4's SqlAzureSecurityAudit (ControllersGridSystemActions/sqlazuresecurityaudit.cs); the
// name is kept so routes/SystemConsoleRoutes.js (options 5 and 8) matches the G4.
//
// Azure SQL reports database principals, role memberships and GRANT/DENY permissions. MongoDB's equivalents are its
// database users and roles; Atlas often refuses usersInfo / rolesInfo to an app login, and the report says so when
// it does. It also covers the server, the connected login's roles, the app's own User collection (where the real
// access control lives), collection document counts and the Mongoose model.
// The connection string (it carries the password) is never written to the report.

const mongoose = require("mongoose");
const User = require("../models/user");
const MongoCatalog = require("./MongoCatalog");
const { writeReport, listIoFiles } = require("./AuditIO");

async function tryCommand(db, command) {
  try {
    return { ok: true, value: await db.command(command) };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

// Option 8. Returns AuditControlBlock (camelCase)
async function runAudit() {
  const result = {
    success: false,
    auditFileName: null,
    auditFilePath: null,
    recordCount: 0,
    reportLength: 0,
    auditDateUTC: new Date().toISOString(),
    auditFiles: []
  };

  try {
    const db = mongoose.connection.db;
    if (!db) throw new Error("MongoDB is not connected");

    const lines = [];
    const add = (...l) => lines.push(...l);
    let records = 0;

    add(
      "================================================",
      "MONGODB SECURITY AUDIT",
      "================================================",
      `Generated UTC : ${new Date().toISOString().replace("T", " ").slice(0, 19)}`,
      ""
    );

    // DATABASE INFORMATION
    add("DATABASE INFORMATION", "---------------------------------------------");
    const build = await tryCommand(db.admin(), { buildInfo: 1 });
    add(
      `Database      : ${MongoCatalog.databaseName()}`,
      `Host          : ${mongoose.connection.host || "(unknown)"}`,
      `Server Version: ${build.ok ? build.value.version : `unavailable (${build.error})`}`,
      `Mongoose      : ${mongoose.version}`
    );
    records++;
    add("");

    // CONNECTED LOGIN (connectionStatus)
    add("CONNECTED LOGIN", "---------------------------------------------");
    const status = await tryCommand(db, { connectionStatus: 1 });
    if (status.ok) {
      const auth = status.value.authInfo || {};
      for (const u of auth.authenticatedUsers || []) add(`User: ${u.user} (db ${u.db})`);
      for (const r of auth.authenticatedUserRoles || []) {
        add(`Role: ${r.role} (db ${r.db})`);
        records++;
      }
    } else {
      add(`connectionStatus unavailable: ${status.error}`);
    }
    add("");

    // DATABASE USERS AND ROLES (the Azure SQL principals / role members / permissions sections)
    add("DATABASE USERS", "---------------------------------------------");
    const users = await tryCommand(db, { usersInfo: 1 });
    if (users.ok) {
      for (const u of users.value.users || []) {
        add(`${u.user} | ${u.db} | roles=${(u.roles || []).map((r) => `${r.role}@${r.db}`).join(", ") || "(none)"}`);
        records++;
      }
      if (!(users.value.users || []).length) add("(none visible)");
    } else {
      add(`usersInfo refused: ${users.error}`, "(Atlas manages database users in its control plane.)");
    }
    add("");

    add("CUSTOM ROLES", "---------------------------------------------");
    const roles = await tryCommand(db, { rolesInfo: 1, showPrivileges: false });
    if (roles.ok) {
      for (const r of roles.value.roles || []) {
        add(`${r.role} | ${r.db} | inherits=${(r.roles || []).map((x) => `${x.role}@${x.db}`).join(", ") || "(none)"}`);
        records++;
      }
      if (!(roles.value.roles || []).length) add("(none)");
    } else {
      add(`rolesInfo refused: ${roles.error}`);
    }
    add("");

    // APPLICATION USERS (the User collection is the real access control)
    add("APPLICATION USERS", "---------------------------------------------");
    try {
      const [total, plain, noHash, twoFactor, disabled, byRole] = await Promise.all([
        User.countDocuments({}),
        User.countDocuments({ plainpassword: { $nin: [null, ""] } }),
        User.countDocuments({ hashedpassword: { $in: [null, ""] } }),
        User.countDocuments({ $or: [{ usertwofactorenabled: true }, { twoFactorRequired: 1 }] }),
        User.countDocuments({ isDisabled: 1 }),
        User.aggregate([{ $group: { _id: { $ifNull: ["$role", "(none)"] }, members: { $sum: 1 } } }, { $sort: { _id: 1 } }])
      ]);
      add(
        `Total Users              : ${total}`,
        `Plain-text Passwords Kept: ${plain}`,
        `No Hashed Password       : ${noHash}`,
        `Two-Factor Enabled       : ${twoFactor}`,
        `Disabled                 : ${disabled}`,
        "",
        "Users by Role:",
        ...byRole.map((r) => `    ${r._id} -> ${r.members}`)
      );
      records += 1 + byRole.length;
    } catch (err) {
      add(`User collection could not be read: ${err.message}`);
    }
    add("");

    // TABLE INVENTORY (collections with document counts)
    add("COLLECTION INVENTORY", "---------------------------------------------");
    for (const name of await MongoCatalog.getLiveCollections()) {
      add(`${MongoCatalog.databaseName()}.${name} | Documents=${await MongoCatalog.getRowCount(name)}`);
      records++;
    }
    add("");

    // MONGOOSE MODEL (the EF model section)
    add("MONGOOSE MODEL", "---------------------------------------------");
    for (const m of MongoCatalog.getModels()) {
      add(`${m.modelName} (${m.collectionName})`);
      records++;
      for (const f of MongoCatalog.getFields(m.schema)) {
        add(`    ${f.fieldName} (${f.dataType})${f.isRequired ? " required" : ""}`);
        records++;
      }
      add("");
    }

    add("", "END OF REPORT");

    const report = lines.join("\n") + "\n";
    const { fileName, filePath } = writeReport("mongosecurityaudit", report);

    return {
      success: true,
      auditFileName: fileName,
      auditFilePath: filePath,
      recordCount: records,
      reportLength: report.length,
      auditDateUTC: new Date().toISOString(),
      auditFiles: listIoFiles()
    };
  } catch (err) {
    return {
      ...result,
      auditFiles: [{ fileName: err.message, fileSize: 0, lastModifiedUTC: new Date().toISOString() }]
    };
  }
}

// Option 5: the files in ./IO
async function showFileListIO() {
  try {
    const files = listIoFiles();
    return {
      success: true,
      auditFileName: null,
      auditFilePath: null,
      recordCount: files.length,
      reportLength: 0,
      auditDateUTC: new Date().toISOString(),
      auditFiles: files
    };
  } catch (err) {
    return {
      success: false,
      auditFileName: null,
      auditFilePath: null,
      recordCount: 0,
      reportLength: 0,
      auditDateUTC: new Date().toISOString(),
      auditFiles: [{ fileName: err.message, fileSize: 0, lastModifiedUTC: new Date().toISOString() }]
    };
  }
}

module.exports = { runAudit, showFileListIO };
