const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");


const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Swagger
const swaggerUi = require("swagger-ui-express"); 
const swaggerSpec = require("./swagger"); 
const basicAuth = require("express-basic-auth"); 
//PASSWORD PROTECT SWAGGER
app.use  ( "/swagger", basicAuth({ users: { admin: "spirit" }, challenge: true }), swaggerUi.serve, swaggerUi.setup(swaggerSpec) );

// -------------------------
// ROUTES
// -------------------------

// Existing routes
app.use("/users", require("./routes/userRoutes"));
app.use("/licenses", require("./routes/licenseRoutes"));
app.use("/licenselogs", require("./routes/licenseLogRoutes"));
app.use("/downloadlogs", require("./routes/downloadLogRoutes"));
app.use("/companies", require("./routes/companyRoutes"));
app.use("/branches", require("./routes/branchRoutes"));
app.use("/instances", require("./routes/instanceRoutes"));

// Product + Review routes
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
app.use("/products", productRoutes);
app.use("/reviews", reviewRoutes);

// Cart routes
const cartRoutes = require("./routes/cartRoutes");
const cartMasterRoutes = require("./routes/cartMasterRoutes");
const cartItemRoutes = require("./routes/cartItemRoutes");
app.use("/cart", cartRoutes);
app.use("/cartmaster", cartMasterRoutes);
app.use("/cartitems", cartItemRoutes);

// NEW: Logging & batch routes
const apiLogRoutes = require("./routes/apiLogRoutes");
const adminLogRoutes = require("./routes/adminLogRoutes");
const batchRoutes = require("./routes/batchRoutes");
app.use("/api/apilogs", apiLogRoutes);
app.use("/api/adminlogs", adminLogRoutes);
app.use("/api/batches", batchRoutes);

// NEW: CGPARKS DTO route
const gcParksRoutes = require("./routes/gcParksRoutes");
app.use("/api/GCPARKS", gcParksRoutes);
app.use("/api/gcparks", gcParksRoutes); // optional lowercase alias

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// -------------------------
// DATABASE + SERVER START
// -------------------------

const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  "mongodb+srv://242sa:wavecrest100@cluster0.dqnu2ja.mongodb.net/?appName=Cluster0";

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
  app.listen(PORT, () =>
    console.log(`API running on http://localhost:${PORT}`)
  );
});
