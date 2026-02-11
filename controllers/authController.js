// controllers/auth.controller.js
const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const USERS_FILE = path.join(__dirname, "../data/users.json");
const CREDS_FILE = path.join(__dirname, "../data/userCreds.json");

const JWT_KEY = process.env.JWT_KEY;
const JWT_ISSUER = process.env.JWT_ISSUER;
const JWT_AUDIENCE = process.env.JWT_AUDIENCE;

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

exports.loginLocal = async (req, res) => {
  const { username, plainPassword } = req.body;

  const users = await loadUsers();
  const user = users.find(
    u => u.Username.toLowerCase() === username.toLowerCase()
  );
  if (!user) return res.status(400).json({ message: "User not found." });

  const creds = await loadCreds();
  const cred = creds.find(c => c.UserId === user.Id);
  if (!cred)
    return res.status(400).json({ message: "User credentials not found." });

  const ok = bcrypt.compareSync(plainPassword, cred.EncryptedPassword);
  if (!ok) return res.status(400).json({ message: "Password mismatch." });

  const token = generateJwt({
    username: user.Username,
    email: user.Email,
    role: user.Role
  });

  res.json({
    userId: user.Id,
    userEmail: user.Email,
    userFullName: user.Fullname,
    userUsername: user.Username,
    userRole: user.Role,
    token
  });
};

exports.login = async (req, res) => {
  const { username, plainPassword } = req.body;

  const user = await User.findOne({
    username: new RegExp(`^${username}$`, "i")
  });
  if (!user) return res.status(400).json({ message: "User not found." });

  const ok = bcrypt.compareSync(plainPassword, user.hashedpassword);
  if (!ok) return res.status(400).json({ message: "Password mismatch." });

  const token = generateJwt(user);

  res.json({
    userId: user.id,
    userFirstname: user.firstname,
    userLastname: user.lastname,
    userUsername: user.username,
    userEmail: user.email,
    IsEmployee: user.employee,
    EmployeeId: user.employeeid,
    userMicrosoftId: user.microsoftid,
    userNcrId: user.ncrid,
    userOracleId: user.oracleid,
    userAzureId: user.azureid,
    userJid: user.jid,
    userRole: user.role,
    userFullName: user.fullname,
    userCompany: user.companyid,
    userBtn: user.btn,
    userIsCertified: user.iscertified,
    Date: new Date().toISOString().split("T")[0],
    token,
    Twofactorprovidertoken: randomSix()
  });
};

exports.signupLocal = async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    email,
    plainPassword,
    activepictureurl
  } = req.body;

  const users = await loadUsers();

  if (users.some(u => u.Email.toLowerCase() === email.toLowerCase()))
    return res.status(400).json({ message: "Email is already registered." });

  if (users.some(u => u.Username.toLowerCase() === username.toLowerCase()))
    return res.status(400).json({ message: "Username is already in use." });

  const newId = users.length ? Math.max(...users.map(u => u.Id)) + 1 : 0;
  const hashed = bcrypt.hashSync(plainPassword, 10);

  const newUser = {
    Id: newId,
    Firstname: firstname,
    Lastname: lastname,
    Username: username,
    Email: email,
    Fullname: `${firstname} ${lastname}`,
    Role: "registered",
    Hashedpassword: hashed,
    Passwordtype: 1,
    Employee: 0,
    Employeeid: "",
    Microsoftid: "",
    Ncrid: "",
    Oracleid: "",
    Azureid: "",
    Plainpassword: "",
    Jid: null,
    Companyid: null,
    Resettoken: null,
    Resettokenexpiration: null,
    Activepictureurl: activepictureurl
  };

  users.push(newUser);
  await saveUsers(users);

  const creds = await loadCreds();
  const newCredId = creds.length ? Math.max(...creds.map(c => c.Id)) + 1 : 1;

  creds.push({
    Id: newCredId,
    UserId: newId,
    EncryptedPassword: hashed
  });

  await saveCreds(creds);

  res.status(201).json({ message: "User registered successfully." });
};

exports.signup = async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    email,
    plainPassword,
    activepictureurl
  } = req.body;

  const existsEmail = await User.findOne({
    email: new RegExp(`^${email}$`, "i")
  });
  if (existsEmail)
    return res.status(400).json({ message: "Email is already registered." });

  const existsUser = await User.findOne({
    username: new RegExp(`^${username}$`, "i")
  });
  if (existsUser)
    return res.status(400).json({ message: "Username is already in use." });

  const hashed = bcrypt.hashSync(plainPassword, 10);

  const newUser = new User({
    firstname,
    lastname,
    username,
    email,
    fullname: `${firstname} ${lastname}`,
    role: "registered",
    hashedpassword: hashed,
    passwordtype: 1,
    employee: 0,
    employeeid: "",
    microsoftid: "",
    ncrid: "",
    oracleid: "",
    azureid: "",
    plainpassword: "",
    jid: null,
    companyid: null,
    resettoken: null,
    resettokenexpiration: null,
    activepictureurl
  });

  await newUser.save();

  res.status(201).json({ message: "User registered successfully." });
};

exports.resetPasswordProfile = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const auth = req.headers.authorization || "";
  const token = auth.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_KEY, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE
    });
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }

  const username = decoded.sub;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "User not found." });

  const ok = bcrypt.compareSync(currentPassword, user.hashedpassword);
  if (!ok)
    return res.status(400).json({ message: "Current password is incorrect." });

  user.hashedpassword = bcrypt.hashSync(newPassword, 10);
  await user.save();

  res.json({ message: "Password successfully updated." });
};

exports.resetPasswordLocal = async (req, res) => {
  const { resetToken, newPassword } = req.body;

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

  res.json({ message: "Password successfully reset (JSON)." });
};

exports.resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

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

  res.json({ message: "Password successfully reset (DB)." });
};
