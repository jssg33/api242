
// server.js
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();

// ----- Middleware -----
app.use(express.json());
app.use(morgan("dev"));

// ----- Config (env vars) -----
// Create a .env file with MONGODB_URI and PORT (see example below)
const PORT = process.env.PORT || 3000;

// You can hardcode the connection for quick testing (NOT recommended for prod):
const MONGODB_URI = "mongodb+srv://242sa@admin:test12345@cluster0.dqnu2ja.mongodb.net/242?appName=Cluster0";

// Prefer environment variable for security:
//const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  console.error(
    "❌ MONGODB_URI is not set. Create a .env file or export the variable. Example:\n" +
    "MONGODB_URI='mongodb+srv://242sa:test12345@cluster0.dqnu2ja.mongodb.net/242?appName=Cluster0'"
  );
  process.exit(1);
}

// ----- Connect to MongoDB -----
async function connectDB() {
  try {
    // Mongoose 6+ no longer needs useNewUrlParser/useUnifiedTopology explicitly
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

// ----- Models -----
// Add some basic validation to your User schema
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
      // Duplicate email
      return res.status(409).json({ error: "Email already exists" });
    }
    res.status(400).json({ error: err.message });
  }
});

// Health check route (handy for uptime checks / container health)
app.get("/health", (req, res) => res.json({ status: "ok" }));

// ----- Start -----
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 API running on http://localhost:${PORT}`);
  });
});
``
