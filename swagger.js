const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GreenLicenseManager",
      version: "1.1.0",
      description: "API documentation for all legacy endpoints",
    },

    components: {
      schemas: {
        User: {
          type: "object",
          required: ["fullname", "email", "plainpassword"],
          properties: {
            id: { type: "string" },
            fullname: { type: "string" },
            email: { type: "string" },
            plainpassword: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          }
        },

        License: {
          type: "object",
          required: ["licenseid", "version", "installdate", "enddate", "customerid"],
          properties: {
            id: { type: "string" },
            licenseid: { type: "string" },
            version: { type: "string" },
            installdate: { type: "string" },
            enddate: { type: "string" },
            customerid: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          }
        },

        LicenseLog: {
          type: "object",
          required: ["licenseid", "accessdate", "userid", "shard", "instanceid", "licensestatus"],
          properties: {
            id: { type: "string" },
            licenseid: { type: "string" },
            accessdate: { type: "string" },
            userid: { type: "string" },
            shard: { type: "string" },
            instanceid: { type: "string" },
            licensestatus: {
              type: "string",
              enum: ["active", "inactive", "expired", "revoked"]
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          }
        },

        DownloadLog: {
          type: "object",
          required: ["downloadsource", "date", "userid", "useremail", "referralsource"],
          properties: {
            id: { type: "string" },
            downloadsource: { type: "string" },
            date: { type: "string" },
            userid: { type: "string" },
            useremail: { type: "string" },
            referralsource: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          }
        }
      }
    },

    tags: [
      { name: "Users", description: "User management" },
      { name: "Licenses", description: "License management" },
      { name: "LicenseLogs", description: "License log entries" },
      { name: "DownloadLogs", description: "Download log entries" }
    ],

    paths: {
      // ---------------- USERS ----------------
      "/users": {
        get: {
          tags: ["Users"],
          summary: "Get all users",
          responses: {
            200: {
              description: "List of users",
              content: {
                "application/json": {
                  schema: { type: "array", items: { $ref: "#/components/schemas/User" } }
                }
              }
            }
          }
        },
        post: {
          tags: ["Users"],
          summary: "Create a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/User" } }
            }
          },
          responses: { 201: { description: "User created" } }
        }
      },

      "/users/{id}": {
        get: {
          tags: ["Users"],
          summary: "Get a user by ID",
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "User found" },
            404: { description: "User not found" }
          }
        },
        put: {
          tags: ["Users"],
          summary: "Update a user",
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/User" } }
            }
          },
          responses: { 200: { description: "User updated" } }
        },
        delete: {
          tags: ["Users"],
          summary: "Delete a user",
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          responses: { 200: { description: "User deleted" } }
        }
      },

      // ---------------- LICENSES ----------------
      "/licenses": {
        get: {
          tags: ["Licenses"],
          summary: "Get all licenses",
          responses: {
            200: {
              description: "List of licenses",
              content: {
                "application/json": {
                  schema: { type: "array", items: { $ref: "#/components/schemas/License" } }
                }
              }
            }
          }
        },
        post: {
          tags: ["Licenses"],
          summary: "Create a new license",
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/License" } }
            }
          },
          responses: { 201: { description: "License created" } }
        }
      },

      "/licenses/{id}": {
        get: {
          tags: ["Licenses"],
          summary: "Get a license by ID",
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "License found" },
            404: { description: "Not found" }
          }
        },
        put: {
          tags: ["Licenses"],
          summary: "Update a license",
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/License" } }
            }
          },
          responses: { 200: { description: "License updated" } }
        },
        delete: {
          tags: ["Licenses"],
          summary: "Delete a license",
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          responses: { 200: { description: "License deleted" } }
        }
      },

      // ---------------- LICENSE LOGS ----------------
      "/licenselogs": {
        get: {
          tags: ["LicenseLogs"],
          summary: "Get all license logs",
          responses: {
            200: {
              description: "List of license logs",
              content: {
                "application/json": {
                  schema: { type: "array", items: { $ref: "#/components/schemas/LicenseLog" } }
                }
              }
            }
          }
        },
        post: {
          tags: ["LicenseLogs"],
          summary: "Create a license log entry",
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/LicenseLog" } }
            }
          },
          responses: { 201: { description: "License log created" } }
        }
      },

      "/licenselogs/{id}": {
        get: {
          tags: ["LicenseLogs"],
          summary: "Get a license log by ID",
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "License log found" },
            404: { description: "Not found" }
          }
        },
        put: {
          tags: ["LicenseLogs"],
          summary: "Update a license log",
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/LicenseLog" } }
            }
          },
          responses: { 200: { description: "License log updated" } }
        },
        delete: {
          tags: ["LicenseLogs"],
          summary: "Delete a license log",
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          responses: { 200: { description: "License log deleted" } }
        }
      },

      // ---------------- DOWNLOAD LOGS ----------------
      "/downloadlogs": {
        get: {
          tags: ["DownloadLogs"],
          summary: "Get all download logs",
          responses: {
            200: {
              description: "List of download logs",
              content: {
                "application/json": {
                  schema: { type: "array", items: { $ref: "#/components/schemas/DownloadLog" } }
                }
              }
            }
          }
        },
        post: {
          tags: ["DownloadLogs"],
          summary: "Create a download log entry",
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/DownloadLog" } }
            }
          },
          responses: { 201: { description: "Download log created" } }
        }
      },

      "/downloadlogs/{id}": {
        get: {
          tags: ["DownloadLogs"],
          summary: "Get a download log by ID",
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "Download log found" },
            404: { description: "Not found" }
          }
        },
        put: {
          tags: ["DownloadLogs"],
          summary: "Update a download log",
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          requestBody: {
            required: true,
            content: {
              "application/json": { schema: { $ref: "#/components/schemas/DownloadLog" } }
            }
          },
          responses: { 200: { description: "Download log updated" } }
        },
        delete: {
          tags: ["DownloadLogs"],
          summary: "Delete a download log",
          parameters: [{ in: "path", name: "id", required: true, schema: { type: "string" } }],
          responses: { 200: { description: "Download log deleted" } }
        }
      }
    }
  },

 
apis: ["./routes/*.js", "./swagger.js", "./server.js"] // Path to your route files
};

module.exports = swaggerJsdoc(options);
