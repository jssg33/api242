const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], allowedHeaders: ["Content-Type", "Authorization"] }));

// Swagger
const swaggerSpec = swaggerJsdoc(require("./swaggerOptions"));
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/users", require("./routes/userRoutes"));
app.use("/licenses", require("./routes/licenseRoutes"));
app.use("/licenselogs", require("./routes/licenseLogRoutes"));
app.use("/downloadlogs", require("./routes/downloadLogRoutes"));
app.use("/companies", require("./routes/companyRoutes"));
app.use("/branches", require("./routes/branchRoutes"));
app.use("/instances", require("./routes/instanceRoutes"));

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// DB + Start
const PORT = process.env.PORT || 3000;
const MONGODB_URI = "mongodb+srv://242sa:wavecrest100@cluster0.dqnu2ja.mongodb.net/?appName=Cluster0";

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

connectDB().then(() => {
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
});
