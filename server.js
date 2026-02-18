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

// Users & Accounts (4)
app.use("/users", require("./routes/userRoutes"));
app.use("/api/notices", require("./routes/userNoticeRoutes"));
app.use("/usercontacts", require("./routes/userContactRoutes"));
app.use("/userhelp", require("./routes/userHelpRoutes"));

// Companies & Branches (3)
app.use("/companies", require("./routes/companyRoutes"));
app.use("/branches", require("./routes/branchRoutes"));
app.use("/instances", require("./routes/instanceRoutes"));

// Logging & Security (5)
app.use("/api/apilogs", require("./routes/apiLogRoutes"));
app.use("/api/adminlogs", require("./routes/adminLogRoutes"));
app.use("/downloadlogs", require("./routes/downloadLogRoutes"));
app.use("/licenselogs", require("./routes/licenseLogRoutes"));
app.use("/userlogs", require("./routes/userLogRoutes"));

// Licensing (1)
app.use("/licenses", require("./routes/licenseRoutes"));

// Parks (1)
app.use("/parks", require("./routes/parkRoutes"));

// DTOs (2)
app.use("/api/GCPARKS", require("./routes/gcParksRoutes"));
app.use("/api/gcparks", require("./routes/gcParksRoutes")); // lowercase alias
app.use("/api/CGCART", require("./routes/cgCartRoutes"));

// Batch Processing (1)
app.use("/api/batches", require("./routes/batchRoutes"));

// Commerce / Sales (7)
app.use("/products", require("./routes/productRoutes"));
app.use("/reviews", require("./routes/reviewRoutes"));
app.use("/salescatalogue", require("./routes/salesCatalogueRoutes"));
app.use("/invoices", require("./routes/invoiceRoutes"));
app.use("/invoicelineitems", require("./routes/invoiceLineItemRoutes"));
app.use("/payments", require("./routes/paymentRoutes"));
app.use("/refunds", require("./routes/refundRoutes"));
app.use('/api/testimonials', require('./routes/testimonialsRoutes'));

// Cart System (3)
app.use("/cart", require("./routes/cartRoutes"));
app.use("/cartmaster", require("./routes/cartMasterRoutes"));
app.use("/cartitems", require("./routes/cartItemRoutes"));

// Reservations (1)
app.use("/reservations", require("./routes/reservationRoutes"));

// Cards (1)
app.use("/cards", require("./routes/cardsRoutes"));

// Releases, Scopes & Project Tasks - Software Engineering(3) 
app.use("/scopes", require("./routes/scopeRoutes")); 
app.use("/projecttasks", require("./routes/projectTaskRoutes"));
app.use('/api/releases', require('./routes/releaseRoutes'));


// ------------------------------- // Route modules // ------------------------------- 
const userSessionRoutes = require("./routes/UserSessionRoutes"); 
app.use("/usersessions", userSessionRoutes); 

//ADDING AUTH TO THE CONTROLLER
const authRoutes = require("./routes/authRoutes"); 
app.use("/auth", authRoutes); 

//LICENSETYPES
const LicenseTypesRouter = require('./routes/LicenseTypesRouter'); 
app.use('/api/licensetypes', LicenseTypesRouter);

// -------------------------
// TOTAL ROUTES: 33
// -------------------------


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
