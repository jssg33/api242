/// controllers/authController.js
const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const UserSession = require("../models/UserSession");
const UserLog = require("../models/userlog");

const USERS_FILE = path.join(__dirname, "../data/users.json");
const CREDS_FILE = path.join(__dirname, "../data/userCreds.json");

const JWT_KEY = process.env.JWT_KEY;
const JWT_ISSUER = process.env.JWT_ISSUER;
const JWT_AUDIENCE = process.env.JWT_AUDIENCE;

// -----------------------------
// SAFE DTO (REMOVE PASSWORD FIELDS ONLY)
// -----------------------------
function safeUserDto(user) {
  const u = user.toObject ? user.toObject() : { ...user };

  delete u.plainpassword;
  delete u.password;
  delete u.hashedpassword;
  delete u.Hashedpassword;
  delete u.EncryptedPassword;

  delete u.resettoken;
  delete u.resettokenexpiration;

  return u;
}

// -----------------------------
// FILE HELPERS (LOCAL JSON MODE)
// -----------------------------
async function loadUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, "utf8");
    return JSON.parse(data) || [];
  } catch {
    return [];
  }
}

async function saveUsers(list) {
  await fs.writeFile(USERS_FILE, JSON.stringify(list, null, 2));
}

async function loadCreds() {
  try {
    const data = await fs.readFile(CREDS_FILE, "utf8");
    return JSON.parse(data) || [];
  } catch {
    return [];
  }
}

async function saveCreds(list) {
  await fs.writeFile(CREDS_FILE, JSON.stringify(list, null, 2));
}

// -----------------------------
// HELPERS
// -----------------------------
function generateJwt(user) {
  return jwt.sign(
    {
      sub: user.username,
      email: user.email,
      role: user.role
    },
    JWT_KEY,
    {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
      expiresIn: "2h"
    }
  );
}

function randomSix() {
  return Math.floor(100000 + Math.random() * 900000);
}

// -----------------------------
// LOGIN (LOCAL JSON FIRST → MONGO SECOND)
// -----------------------------
exports.login = async (req, res) => {
  const { username, plainpassword, location, ipaddress, uiorigin } = req.dto;

  // 1. LOCAL JSON USERS FIRST
  let users = await loadUsers();

  let localUser = users.find(
    u => u.Username?.toLowerCase() === username.toLowerCase()
  );

  if (localUser) {
    const creds = await loadCreds();
    const cred = creds.find(c => c.UserId === localUser.Id);

    if (cred) {
      const ok = bcrypt.compareSync(plainpassword, cred.EncryptedPassword);

      await UserLog.create({
        id: Date.now(),
        username,
        hashid: localUser.Id,
        location: location || "",
        ipaddress: ipaddress || "",
        loginstatus: ok ? "success" : "failed",
        description: "Local JSON login attempt",
        uiorigin: uiorigin || "unknown"
      });

      if (!ok)
        return res.status(400).json({ message: "Password mismatch." });

      const token = generateJwt({
        username: localUser.Username,
        email: localUser.Email,
        role: localUser.Role
      });

      return res.json({
        user: safeUserDto(localUser),
        token,
        source: "local"
      });
    }
  }

  // 2. MONGO LOGIN
  try {
    const user = await User.findOne({
      username: new RegExp(`^${username}$`, "i")
    }).lean();

    if (!user) {
      await UserLog.create({
        id: Date.now(),
        username,
        hashid: 0,
        location,
        ipaddress,
        loginstatus: "failed",
        description: "Mongo login - user not found",
        uiorigin
      });
      return res.status(400).json({ message: "User not found." });
    }

    const hashed =
      user.hashedpassword ||
      user.Hashedpassword ||
      user.password ||
      null;

    if (!hashed) {
      console.error("User record missing hashed password:", user);
      return res.status(500).json({
        message: "Corrupt user record: missing hashedpassword"
      });
    }

    const ok = bcrypt.compareSync(plainpassword, hashed);

    await UserLog.create({
      id: Date.now(),
      username,
      hashid: user.userid || user.id || 0,
      location: location || "",
      ipaddress: ipaddress || "",
      loginstatus: ok ? "success" : "failed",
      description: "Mongo login attempt",
      uiorigin: uiorigin || "unknown"
    });

    if (!ok)
      return res.status(400).json({ message: "Password mismatch." });

    const token = generateJwt({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    });

    return res.json({
      user: safeUserDto(user),
      token,
      source: "mongo"
    });

  } catch (err) {
    console.error("MongoDB login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// -----------------------------
// LOGOUT
// -----------------------------
exports.logout = async (req, res) => {
  const auth = req.headers.authorization || "";
  const token = auth.split(" ")[1];
  const { location, ipaddress, uiorigin } = req.dto;

  if (!token)
    return res.status(401).json({ message: "Missing token" });

  try {
    const decoded = jwt.verify(token, JWT_KEY, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE
    });

    const session = await UserSession.findOne({ token });

    if (!session)
      return res.status(400).json({ message: "Session not found" });

    session.sessionend = new Date().toISOString();
    session.sessioncomplete = 1;
    session.acknowledged = 1;

    await session.save();

    await UserLog.create({
      id: Date.now(),
      username: decoded.sub,
      hashid: session.userid,
      location: location || "",
      ipaddress: ipaddress || "",
      loginstatus: "logout",
      description: "User logged out",
      uiorigin: uiorigin || "unknown"
    });

    return res.json({ message: "Logout successful" });

  } catch (err) {
    console.error("Logout error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// -----------------------------
// SIGNUP (MONGO)
// -----------------------------
exports.signup = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      username,
      email,
      plainpassword,
      activepictureurl
    } = req.dto;
    
    const existsEmail = await User.findOne({
      email: new RegExp(`^${email}$`, "i")
    });
    if (existsEmail)
      return res.status(400).json({ message: "Email already registered." });

    const existsUser = await User.findOne({
      username: new RegExp(`^${username}$`, "i")
    });
    if (existsUser)
      return res.status(400).json({ message: "Username already in use." });

    const hashed = bcrypt.hashSync(plainpassword, 10);

    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      fullname: `${firstname} ${lastname}`,
      role: "registered",
      plainpassword,
      hashedpassword: hashed,
      activepictureurl
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully.",
      user: safeUserDto(newUser)
    });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

// -----------------------------
// RESET PASSWORD (MONGO)
// -----------------------------
exports.resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.dto;

  if (!resetToken)
    return res.status(400).json({ message: "Token is null." });

  const user = await User.findOne({
    resettoken: resetToken,
    resettokenexpiration: { $gt: new Date() }
  });

  if (!user)
    return res.status(400).json({ message: "Invalid or expired token." });

  user.hashedpassword = bcrypt.hashSync(newPassword, 10);
  user.resettoken = null;
  user.resettokenexpiration = null;

  await user.save();

  res.json({ message: "Password reset successfully." });
};

// -----------------------------
// RESET PASSWORD (LOCAL JSON)
// -----------------------------
exports.resetPasswordLocal = async (req, res) => {
  const { resetToken, newPassword } = req.dto;

  if (!resetToken)
    return res.status(400).json({ message: "Token is null." });

  const users = await loadUsers();
  const now = new Date();

  const user = users.find(
    u =>
      u.Resettoken === resetToken &&
      u.Resettokenexpiration &&
      new Date(u.Resettokenexpiration) > now
  );

  if (!user)
    return res.status(400).json({ message: "Invalid or expired token." });

  user.Hashedpassword = bcrypt.hashSync(newPassword, 10);
  user.Resettoken = null;
  user.Resettokenexpiration = null;

  await saveUsers(users);

  res.json({ message: "Password reset successfully (local)." });
};

// -----------------------------
// LOCAL LOGIN
// -----------------------------
exports.loginLocal = async (req, res) => {
  const { username, plainPassword, location, ipaddress, uiorigin } = req.dto;

  try {
    const users = await loadUsers();
    const localUser = users.find(
      u => u.Username?.toLowerCase() === username.toLowerCase()
    );

    if (!localUser) {
      await UserLog.create({
        id: Date.now(),
        username,
        hashid: 0,
        location: location || "",
        ipaddress: ipaddress || "",
        loginstatus: "failed",
        description: "Local JSON login - user not found",
        uiorigin: uiorigin || "unknown"
      });

      return res.status(400).json({ message: "User not found (local)." });
    }

    const creds = await loadCreds();
    const cred = creds.find(c => c.UserId === localUser.Id);

    if (!cred) {
      await UserLog.create({
        id: Date.now(),
        username,
        hashid: localUser.Id,
        location: location || "",
        ipaddress: ipaddress || "",
        loginstatus: "failed",
        description: "Local JSON login - credentials missing",
        uiorigin: uiorigin || "unknown"
      });

      return res.status(400).json({ message: "Credentials not found (local)." });
    }

    const ok = bcrypt.compareSync(plainPassword, cred.EncryptedPassword);

    await UserLog.create({
      id: Date.now(),
      username,
      hashid: localUser.Id,
      location: location || "",
      ipaddress: ipaddress || "",
      loginstatus: ok ? "success" : "failed",
      description: "Local JSON login attempt",
      uiorigin: uiorigin || "unknown"
    });

    if (!ok)
      return res.status(400).json({ message: "Password mismatch." });

    const token = generateJwt({
      username: localUser.Username,
      email: localUser.Email,
      role: localUser.Role
    });

    return res.json({
      user: safeUserDto(localUser),
      token,
      source: "local"
    });

  } catch (err) {
    console.error("Local login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// -----------------------------
// LOCAL SIGNUP
// -----------------------------
exports.signupLocal = async (req, res) => {
  const { firstname, lastname, username, email, plainPassword, activepictureurl } = req.dto;

  try {
    const users = await loadUsers();
    const creds = await loadCreds();

    if (users.some(u => u.Username.toLowerCase() === username.toLowerCase())) {
      return res.status(400).json({ message: "Username already exists (local)." });
    }

    const newUser = {
      Id: Date.now(),
      Username: username,
      Firstname: firstname,
      Lastname: lastname,
      Email: email,
      Fullname: `${firstname} ${lastname}`,
      Role: "registered",
      Activepictureurl: activepictureurl
    };

    users.push(newUser);
    await saveUsers(users);

    const hashed = bcrypt.hashSync(plainPassword, 10);
    creds.push({
      UserId: newUser.Id,
      EncryptedPassword: hashed
    });

    await saveCreds(creds);

    return res.status(201).json({
      message: "User created successfully (local).",
      user: safeUserDto(newUser)
    });

  } catch (err) {
    console.error("signupLocal error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// -----------------------------
// RESET PASSWORD FROM PROFILE
// -----------------------------
exports.resetPasswordProfile = async (req, res) => {
  const { currentPassword, newPassword } = req.dto;

  try {
    const auth = req.headers.authorization || "";
    const token = auth.split(" ")[1];

    if (!token)
      return res.status(401).json({ message: "Missing token" });

    const decoded = jwt.verify(token, JWT_KEY, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE
    });

    const user = await User.findOne({
      username: new RegExp(`^${decoded.sub}$`, "i")
    });

    if (!user)
      return res.status(400).json({ message: "User not found." });

    const ok = bcrypt.compareSync(currentPassword, user.hashedpassword);
    if (!ok)
      return res.status(400).json({ message: "Current password incorrect." });

    user.hashedpassword = bcrypt.hashSync(newPassword, 10);
    await user.save();

    return res.json({ message: "Password updated successfully." });

  } catch (err) {
    console.error("resetPasswordProfile error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// -----------------------------
// GET USER BY USERNAME (MONGO)
// -----------------------------
exports.getUser = async (req, res) => {
  try {
    const { username } = req.dto;

    if (!username)
      return res.status(400).json({ message: "Username is required." });

    const user = await User.findOne({
      username: new RegExp(`^${username}$`, "i")
    });

    if (!user)
      return res.status(404).json({ message: "User not found." });

    const safeUser = safeUserDto(user);

    return res.json({
      mongoid: user._id,
      user: safeUser
    });

  } catch (err) {
    console.error("getUser error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
