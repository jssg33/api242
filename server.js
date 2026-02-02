const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

//MOVE MODELS FROM SERVER.JS TO PROPER HOME

const User = require("./models/user"); 
const License = require("./models/license"); 
const LicenseLog = require("./models/licenselog"); 
const DownloadLog = require("./models/downloadlog");

// ----- Middleware (must come BEFORE routes) -----
app.use(express.json());
app.use(morgan("dev"));
//app.use(cors());
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], allowedHeaders: ["Content-Type", "Authorization"] }));


// ----- Swagger Setup -----
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GreenLicenseManager",
      version: "1.0.1",
      description: "API documentation for all endpoints",
    },

    components: {
      schemas: {
       License: {
  type: "object",
  required: [
    "licenseid",
    "version",
    "installdate",
    "enddate",
    "customerid"
  ],
  properties: {
    id: {
      type: "string",
      description: "MongoDB ObjectId"
    },
    licenseid: {
      type: "string",
      description: "Unique license identifier"
    },
    version: {
      type: "string",
      description: "Software version"
    },
    installdate: {
      type: "string",
      description: "Installation date (YYYY-MM-DD)"
    },
    enddate: {
      type: "string",
      description: "Expiration date (YYYY-MM-DD)"
    },
    customerid: {
      type: "string",
      description: "Customer identifier"
    },
    createdAt: {
      type: "string",
      format: "date-time"
    },
    updatedAt: {
      type: "string",
      format: "date-time"
    }
  },
  example: {
    licenseid: "LIC-001",
    version: "1.0.0",
    installdate: "2025-01-01",
    enddate: "2026-01-01",
    customerid: "COMP-001"
  }
},


        LicenseLog: {
          type: "object",
          required: ["licenseId", "action"],
          properties: {
            id: { type: "string" },
            licenseId: { type: "string" },
            action: { type: "string" },
            details: { type: "string" },
            createdAt: { type: "string", format: "date-time" }
          }
        }
      }
    },

    paths: {
      "/licenses": {
        get: {
          summary: "Get all licenses",
          tags: ["Licenses"],
          responses: {
            200: {
              description: "List of licenses",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/License" }
                  }
                }
              }
            }
          }
        },
        post: {
          summary: "Create a new license",
          tags: ["Licenses"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/License" }
              }
            }
          },
          responses: {
            201: { description: "License created" }
          }
        }
      },

      "/licenses/{id}": {
        get: {
          summary: "Get a license by ID",
          tags: ["Licenses"],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" }
            }
          ],
          responses: {
            200: {
              description: "License found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/License" }
                }
              }
            },
            404: { description: "Not found" }
          }
        },
        put: {
          summary: "Update a license",
          tags: ["Licenses"],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" }
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/License" }
              }
            }
          },
          responses: {
            200: { description: "License updated" }
          }
        },
        delete: {
          summary: "Delete a license",
          tags: ["Licenses"],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" }
            }
          ],
          responses: {
            200: { description: "License deleted" }
          }
        }
      },

      "/licenselogs": {
        get: {
          summary: "Get all license logs",
          tags: ["LicenseLogs"],
          responses: {
            200: {
              description: "List of license logs",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/LicenseLog" }
                  }
                }
              }
            }
          }
        },
        post: {
          summary: "Create a license log entry",
          tags: ["LicenseLogs"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LicenseLog" }
              }
            }
          },
          responses: {
            201: { description: "License log created" }
          }
        }
      },

      "/licenselogs/{id}": {
        get: {
          summary: "Get a license log by ID",
          tags: ["LicenseLogs"],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" }
            }
          ],
          responses: {
            200: {
              description: "License log found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/LicenseLog" }
                }
              }
            },
            404: { description: "Not found" }
          }
        },
        delete: {
          summary: "Delete a license log",
          tags: ["LicenseLogs"],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" }
            }
          ],
          responses: {
            200: { description: "License log deleted" }
          }
        }
      }
    }
  },

  apis: ["./routes/*.js", "./swagger.js", "./server.js"] // not using route annotations right now
};


const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// ----- Config -----
const PORT = process.env.PORT || 3000;

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

// --------------------------------------------------
// NEW ROUTES (Company / Branch / Instance)
// --------------------------------------------------

const companyRoutes = require("./routes/companyRoutes");
const branchRoutes = require("./routes/branchRoutes");
const instanceRoutes = require("./routes/instanceRoutes");

app.use("/companies", companyRoutes);
app.use("/branches", branchRoutes);
app.use("/instances", instanceRoutes);

// --------------------------------------------------
// OLD INLINE CRUD ROUTES (unchanged)
// --------------------------------------------------

// USERS CRUD
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

// LICENSE CRUD
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

// LICENSE LOG CRUD
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

// DOWNLOAD LOG CRUD
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

