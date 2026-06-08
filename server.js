const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// THE API IS PROTECTED USING CORS. SINCE IT IS HOSTED PUBLICALLY IT HAD TO HAVE RESTRICTIONS TO BLOCK IT FROM PUBLIC USE.
// SWAGGER IS LOADED AND RUNS ON THE PLATFORM TO ALLOW REMOTE ADMINISTRATION IT IS PASSWORD PROTECTED BY BASIC AUTH CAPABILITIES. THIS IS PROBABLY NOT SUFFICIENT IN PRODUCTION.
// THE INLINE CALLS TO THE API DELIVER CORS ERRORS TO EVERY URL ACCESSING THEM EXCEPT THE EXACT ORIGINS BELOW. ALL OTHER ACCESS IS BLOCKED.
// FIGMA WAS USED IN CSCE242 TO MODEL UI INTERFACES
// NOTE RENDER IS NOT NEEDED AS CTS HAS A MUCH MORE SECURE HOSTING ENVIRONMENT, BUT WE WERE REQUIRED TO USE IT FOR CLASS PROJECT, AND IT PERFORMS BEAUTIFULLY. IT TIES TO GITHUB AND AUTOMATICALLY
// UPDATES VIA GITHUB ACTIONS WHEN CHANGES POST. THIS ALLOWS FOR API MODIFICATIONS WITHOUT ANY NEED FOR ANY MICROSOFT TOOLS AT ALL. YOU CAN MAKE TEXT MODIFICATIONS TO GITHUB DIRECTLY AND THEY GO RIGHT INTO
// PRODUCTION... ITS VERY NICE.. THUS GITHUB CAN ACT AS AN IDE IN FACT. IT DOES BASICS LIKE CHECK GRAMMAR BY FILE TYPE.

const allowedOrigins = [
  "https://jssg33.github.io",
  "https://react242-ho2o.onrender.com",
  "http://react242-ho2o.onrender.com",
  "http://figmamanagerui.onrender.com",
  "https://figmamanagerui.onrender.com",
  "https://licenses.greenvilleassociates.com",
  "https://ordermanagementsystem-50i2.onrender.com",
  "https://spline-dew-76774247.figma.site",
  "https://figma.site",
  "https://figma.com",
  "https://www.figma.com",
  "https://gliops.glocation.info"
];

// USC: 129.0.0.0/8
const uscIpRange = /^129\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

// AT&T: 99.0.0.0/8
const attIpRange = /^99\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

// CTS: 107.0.0.0/8 VIA ATT ASSIGNED RANGE
const attCustIpRange = /^107\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow curl/Postman

      // Allow listed domains
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Extract hostname from origin
      let hostname = "";
      try {
        hostname = new URL(origin).hostname;
      } catch (e) {
        return callback(new Error("Invalid origin"));
      }

      // Allow USC 129.0.0.0/8
      if (uscIpRange.test(hostname)) {
        return callback(null, true);
      }

      // Allow AT&T 99.0.0.0/8
      if (attIpRange.test(hostname)) {
        return callback(null, true);
      }

      // Allow AT&T Customer Ranges 107.0.0.0/8
      if (attCustIpRange.test(hostname)) {
        return callback(null, true);
      }
      
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// Preflight handler
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(200);
  }
  next();
});


// Swagger
const swaggerUi = require("swagger-ui-express"); 
const swaggerSpec = require("./swagger"); 
const basicAuth = require("express-basic-auth"); 
//PASSWORD PROTECT SWAGGER AND SORT IT
app.use(
  "/swagger",
  basicAuth({ users: { admin: "spirit" }, challenge: true }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      operationsSorter: "alpha",
      tagsSorter: "alpha"
    }
  })
);
// -------------------------
// ROUTES
// -------------------------

// Users & Accounts (6)
app.use("/users", require("./routes/userRoutes"));
app.use("/api/notices", require("./routes/userNoticeRoutes"));
app.use("/usercontacts", require("./routes/userContactRoutes"));
app.use("/userhelp", require("./routes/userHelpRoutes"));
app.use("/userprojects", require("./routes/UserProjectRoutes"));
app.use("/usergroups", require("./routes/userGroupRoutes"));

// Companies & Branches (6)
app.use("/companies", require("./routes/companyRoutes"));
app.use("/branches", require("./routes/branchRoutes"));
app.use("/instances", require("./routes/instanceRoutes"));
app.use("/employees", require("./routes/employeeRoutes"));
app.use("/managers", require("./routes/managerRoutes"));
app.use("/api/analysts", require("./routes/analystRoutes"));

// Logging & Security (5)
app.use("/api/apilogs", require("./routes/apiLogRoutes"));
app.use("/api/adminlogs", require("./routes/adminLogRoutes"));
app.use("/downloadlogs", require("./routes/downloadLogRoutes"));
app.use("/licenselogs", require("./routes/licenseLogRoutes"));
const userlogRoutes = require("./routes/userlogRoutes");
app.use("/api/userlog", userlogRoutes);

// Licensing (2)
app.use("/licenses", require("./routes/licenseRoutes"));
app.use("/api/licensetypes", require("./routes/LicenseTypesRouter"));

// Parks (1)
app.use("/parks", require("./routes/parkRoutes"));

// DTOs (4)
app.use("/api/GCPARKS", require("./routes/gcParksRoutes"));
app.use("/api/gcparks", require("./routes/gcParksRoutes"));
app.use("/api/CGCART", require("./routes/cgCartRoutes"));
app.use("/", require("./routes/northbound"));
app.use("/", require("./routes/southbound"));

// Batch Processing (1)
app.use("/api/batches", require("./routes/batchRoutes"));

// Commerce / Sales (11)
app.use("/products", require("./routes/productRoutes"));
app.use("/reviews", require("./routes/reviewRoutes"));
app.use("/salescatalogue", require("./routes/salesCatalogueRoutes"));
app.use("/invoices", require("./routes/invoiceRoutes"));
app.use("/invoicelineitems", require("./routes/invoiceLineItemRoutes"));
app.use("/payments", require("./routes/paymentRoutes"));
app.use("/refunds", require("./routes/refundRoutes"));
app.use("/api/testimonials", require("./routes/testimonialsRoutes"));
app.use("/", require("./routes/ProductReviewRoutes"));
app.use("/quotation", require("./routes/quotation.routes.js"));
app.use("/quotationlines", require("./routes/quotationlines.routes.js"));
app.use("/api/specialpricing", require("./routes/specialPricingRoutes"));
app.use('/api/salespeople', require('./routes/salespersonRoutes'));
app.use('/api/salesmanagers', require('./routes/salesManagerRoutes'));
app.use('/api/homes', require('./routes/homeResellerRoutes'));

// 5.20.2026 OPS ADDS SIGNIFICANT BUILD
//01 Provisioning
app.use("/api/provisioners", require("./routes/provisionerRoutes"));
app.use("/api/provisioningmanagers", require("./routes/provisioningManagerRoutes"));
//02 Quality Assurance
app.use("/api/qualityanalysts", require("./routes/qualityAnalystRoutes"));
app.use("/api/qualitymanagers", require("./routes/qualityManagerRoutes"));
//03 Care Analysts
app.use("/api/careanalysts", require("./routes/careAnalystRoutes"));
app.use("/api/caremanagers", require("./routes/careManagerRoutes"));
//04 NOC Tech
app.use("/api/noctechs", require("./routes/nocTechRoutes"));
app.use("/api/nocmanagers", require("./routes/nocManagerRoutes"));
//05 Field Tech
app.use("/api/fieldtechs", require("./routes/fieldTechRoutes"));
app.use("/api/fieldtechmanagers", require("./routes/fieldTechManagerRoutes"));
//06GOOD TO HERE
// Business Analysts / Directors
app.use("/api/businessanalysts", require("./routes/businessAnalystRoutes"));
app.use("/api/businessdirectors", require("./routes/businessDirectorRoutes"));
// Directors / Managing Directors
app.use("/api/directors", require("./routes/directorRoutes"));
app.use("/api/managingdirectors", require("./routes/managingDirectorRoutes"));
// Business Executives
app.use("/api/buexecutives", require("./routes/buExecutiveRoutes"));
// Organizational Structure
app.use("/api/organizationunits", require("./routes/organizationUnitRoutes"));
app.use("/api/businessunits", require("./routes/businessUnitRoutes"));
// Installers & Vehicles
app.use("/api/trucks", require("./routes/truckRoutes"));
app.use("/api/installers", require("./routes/installerRoutes"));
app.use("/api/installermanagers", require("./routes/installerManagerRoutes"));

// Cart System (3)
app.use("/cart", require("./routes/cartRoutes"));
app.use("/cartmaster", require("./routes/cartMasterRoutes"));
app.use("/cartitems", require("./routes/cartItemRoutes"));

// Reservations (1)
app.use("/reservations", require("./routes/reservationRoutes"));

// Cards (1)
app.use("/cards", require("./routes/cardsRoutes"));

// Releases, Scopes & Project Tasks (5)
app.use("/scopes", require("./routes/scopeRoutes"));
app.use("/projecttasks", require("./routes/projectTaskRoutes"));
app.use("/api/releases", require("./routes/releaseRoutes"));
app.use("/api/projects", require("./routes/projects"));
app.use("/projectmilestones", require("./routes/projectMilestoneRoutes"));

// SSO (2)
app.use("/usersessions", require("./routes/UserSessionRoutes"));
app.use("/auth", require("./routes/authRoutes"));

// OTHER (1)
app.use("/api/songs", require("./routes/songs"));

// Add Building API routes - Building GEOFENCING
const buildingRoutes = require("./routes/buildingRoutes");
app.use("/api/buildings", buildingRoutes);
// Add Campuses for Companies or Universities
const campusRoutes = require("./routes/campusRoutes");
app.use("/api/campuses", campusRoutes);
//Add Building History
const buildingHistoryRoutes = require('./routes/buildingHistoryRoutes');
app.use('/api/building-history', buildingHistoryRoutes);
const beaconRoutes = require('./routes/beaconRoutes');
// Routes
app.use('/api/beacons', beaconRoutes);
//Bootstrap Parameters
const bootstrapMobileRoutes = require('./routes/bootstrapMobileRoutes.js');
app.use("/api/bootstrapmobile", bootstrapMobileRoutes);


// Delete Twitter User Details
const twitterRoutes = require('./routes/twitter');   // ← Adjust path if needed
// Mount Routes
app.use('/api/twitter', twitterRoutes);

// Take Requests from Users to Delete Stuff
const twitterRoutes = require('./routes/twitterRoutes');
app.use('/api', twitterRoutes);




// --------------------------------------------------------------------------------------------------------------------------------------------------------
// TOTAL ROUTES:51 x 5 +(User, Region, SalesId)= 255 ENPOINTS + LICENSE & LICENSELOGS & ANALYSTS, QUOTES AND SPECIALPRICING (ADD GET BY USER, BY GROUP, BY COMPANY) = 265 TOTAL API ENDPOINTS ALL BUILT OR PORTED IN SPRING OF 2026.
// NOTES ON PORT VS NEW || NEW->(SONGS(1), PROJECT TASKS(5), SALES (4 OF 8), DTOS (2 OF 4), LICENSES(2) -> 14/47 TABLES NEW -> 33 TABLES PORTED FROM C#.
// GEN3 -> PORTED APIS WERE C# FORMED MODELS WHICH WERE TRANSLATED INTO NODEJS MODELS USING MONGOOSE DRIVERS TO MONGO DB.
// GEN2 -> AN UPDATED C# API WAS BUILT IN CSCE547 FALL OF 25 AT THE UNIVERSITY OF SOUTH CAROLINA - C# CLIENT SIDE DEVELOPMENT FOR THE BIKES CLASS PROJECT WHICH WAS LOOSELY BASED ON GEN1.
// GEN1 -> THE ORIGINAL MODEL WAS BUILT IN CSCE590 IN THE SPRING OF 25 BY JOHN S. STRITZINGER AT THE UNIVERSITY OF SOUTH CAROLINA - C# CLIENT SIDE DEVELOPMENT FOR THE BIKES CLASS PROJECT.
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


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
