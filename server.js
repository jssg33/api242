
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

// ----- Models -----
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// ----- Routes -----
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (err) {
    console.error("GET /users error:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error("POST /users error:", err);
    if (err.code === 11000) {
      return res.status(409).json({ error: "Email already exists" });
    }
    res.status(400).json({ error: err.message });
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
