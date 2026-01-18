// server.js
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();

// ----- Middleware -----
app.use(express.json());
app.use(morgan("dev"));

// ----- Config -----
const PORT = process.env.PORT || 3000;

// IMPORTANT: Your username contains "@", so it must be URL‑encoded.
// 242sa@admin  →  242sa%40admin
const MONGODB_URI =
  "mongodb+srv://242sa:wavecrest100@cluster0.dqnu2ja.mongodb.net/?appName=Cluster0";

// ----- Connect to MongoDB -----
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

// ----- MODELS -----

// USER MODEL
const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 150,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    plainpassword: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// LICENSE MODEL
const licenseSchema = new mongoose.Schema(
  {
    licenseid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    version: {
      type: String,
      required: true,
      trim: true,
    },
    installdate: {
      type: String,
      required: true,
    },
    enddate: {
      type: String,
      required: true,
    },
    customerid: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const License = mongoose.model("License", licenseSchema);

// LICENSE LOG MODEL
const licenseLogSchema = new mongoose.Schema(
  {
    licenseid: {
      type: String,
      required: true,
      trim: true,
    },
    accessdate: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
      trim: true,
    },
    shard: {
      type: String,
      required: true,
    },
    instanceid: {
      type: String,
      required: true,
    },
    licensestatus: {
      type: String,
      required: true,
      enum: ["active", "inactive", "expired", "revoked"],
    },
  },
  { timestamps: true }
);

const LicenseLog = mongoose.model("LicenseLog", licenseLogSchema);

// DOWNLOAD LOG MODEL
const downloadLogSchema = new mongoose.Schema(
  {
    downloadsource: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
      trim: true,
    },
    useremail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    referralsource: {
      type: String,
      required: true,
      trim: true,
    }
  },
  { timestamps: true }
);

const DownloadLog = mongoose.model("DownloadLog", downloadLogSchema);

// ----- ROUTES -----

// =========================
// USERS CRUD
// =========================

app.get("/users", async (req, res) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "Email already exists" });
    }
    res.status(400).json({ error: err.message });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// =========================
// LICENSES CRUD
// =========================

app.get("/licenses", async (req, res) => {
  try {
    const licenses = await License.find().lean();
    res.json(licenses);
  } catch {
    res.status(500).json({ error: "Failed to fetch licenses" });
  }
});

app.post("/licenses", async (req, res) => {
  try {
    const license = await License.create(req.body);
    res.status(201).json(license);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "License ID already exists" });
    }
    res.status(400).json({ error: err.message });
  }
});

app.get("/licenses/:id", async (req, res) => {
  try {
    const license = await License.findById(req.params.id).lean();
    if (!license) return res.status(404).json({ error: "License not found" });
    res.json(license);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
});

app.put("/licenses/:id", async (req, res) => {
  try {
    const license = await License.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!license) return res.status(404).json({ error: "License not found" });
    res.json(license);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/licenses/:id", async (req, res) => {
  try {
    const license = await License.findByIdAndDelete(req.params.id);
    if (!license) return res.status(404).json({ error: "License not found" });
    res.json({ message: "License deleted" });
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// =========================
// LICENSE LOG CRUD
// =========================

app.get("/licenselogs", async (req, res) => {
  try {
    const logs = await LicenseLog.find().lean();
    res.json(logs);
  } catch {
    res.status(500).json({ error: "Failed to fetch license logs" });
  }
});

app.post("/licenselogs", async (req, res) => {
  try {
    const log = await LicenseLog.create(req.body);
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/licenselogs/:id", async (req, res) => {
  try {
    const log = await LicenseLog.findById(req.params.id).lean();
    if (!log) return res.status(404).json({ error: "Log not found" });
    res.json(log);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
});

app.put("/licenselogs/:id", async (req, res) => {
  try {
    const log = await LicenseLog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!log) return res.status(404).json({ error: "Log not found" });
    res.json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/licenselogs/:id", async (req, res) => {
  try {
    const log = await LicenseLog.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ error: "Log not found" });
    res.json({ message: "Log deleted" });
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// =========================
// DOWNLOAD LOG CRUD
// =========================

app.get("/downloadlogs", async (req, res) => {
  try {
    const logs = await DownloadLog.find().lean();
    res.json(logs);
  } catch {
    res.status(500).json({ error: "Failed to fetch download logs" });
  }
});

app.post("/downloadlogs", async (req, res) => {
  try {
    const log = await DownloadLog.create(req.body);
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/downloadlogs/:id", async (req, res) => {
  try {
    const log = await DownloadLog.findById(req.params.id).lean();
    if (!log) return res.status(404).json({ error: "Download log not found" });
    res.json(log);
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
});

app.put("/downloadlogs/:id", async (req, res) => {
  try {
    const log = await DownloadLog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!log) return res.status(404).json({ error: "Download log not found" });
    res.json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/downloadlogs/:id", async (req, res) => {
  try {
    const log = await DownloadLog.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ error: "Download log not found" });
    res.json({ message: "Download log deleted" });
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
});

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// ----- Start -----
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 API running on http://localhost:${PORT}`);
  });
});
