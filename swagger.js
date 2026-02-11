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
  required: ["fullname", "email", "password"],
  properties: {
    // -------------------------------------------------
    // Core Identity
    // -------------------------------------------------
    id: { type: "number" },
    userid: { type: "number" },
    useridstring: { type: "string" },
    uidstring: { type: "string" },

    firstname: { type: "string" },
    lastname: { type: "string" },
    fullname: { type: "string", maxLength: 150 },
    displayname: { type: "string" },
    username: { type: "string" },
    pronoun: { type: "string" },
    maritalstatus: { type: "string" },

    email: { type: "string", format: "email" },

    // -------------------------------------------------
    // Contact
    // -------------------------------------------------
    phone: { type: "string" },
    cellphone: { type: "string" },
    sms: { type: "number" },
    fax: { type: "string" },
    btnphone: { type: "string" },

    dateOfBirth: { type: "string" },

    // -------------------------------------------------
    // Address
    // -------------------------------------------------
    address1: { type: "string" },
    address2: { type: "string" },
    city: { type: "string" },
    state: { type: "string" },
    postalzip: { type: "string" },
    country: { type: "string" },

    // -------------------------------------------------
    // Authentication
    // -------------------------------------------------
    password: { type: "string", minLength: 4, maxLength: 200 },
    plainpassword: { type: "string" },
    hashedpassword: { type: "string" },
    passwordtype: { type: "number" },

    resettoken: { type: "string" },
    resettokenexpiration: { type: "string", format: "date-time" },

    usertwofactorenabled: { type: "boolean" },
    usertwofactortype: { type: "string" },
    usertwofactorkeysmsdestination: { type: "string" },
    twofactorkeyemaildestination: { type: "string" },
    twofactorprovider: { type: "string" },
    twofactorprovidertoken: { type: "string" },
    twofactorproviderauthstring: { type: "string" },

    // -------------------------------------------------
    // Employment
    // -------------------------------------------------
    employee: { type: "boolean" },
    employeeid: { type: "string" },

    buid: { type: "number" },
    managerid: { type: "number" },
    regionid: { type: "number" },

    microsoftid: { type: "string" },
    ncrid: { type: "string" },
    oracleid: { type: "string" },
    azureid: { type: "string" },

    // -------------------------------------------------
    // Company / Branch
    // -------------------------------------------------
    companyId: { type: "string" },
    companyid: { type: "string" },

    branchId: { type: "string" },
    branchid: { type: "number" },

    role: {
      type: "string",
      enum: ["admin", "manager", "user", "superuser"],
      default: "user"
    },

    corporateuser: { type: "string", default: "False" },

    status: {
      type: "string",
      enum: ["active", "inactive", "pending"],
      default: "active"
    },

    // -------------------------------------------------
    // Education
    // -------------------------------------------------
    university: { type: "string" },
    university1: { type: "string" },
    university2: { type: "string" },

    // -------------------------------------------------
    // Social Links
    // -------------------------------------------------
    linkedinurl: { type: "string" },
    instagramurl: { type: "string" },
    vimeourl: { type: "string" },
    facebookurl: { type: "string" },
    googleurl: { type: "string" },

    // -------------------------------------------------
    // System Fields
    // -------------------------------------------------
    jid: { type: "number" },
    btn: { type: "string" },
    iscertified: { type: "boolean" },

    activepictureurl: { type: "string" },

    defaultinstanceid: { type: "string" },
    defaultshardid: { type: "string" },

    cartMasterIndex: { type: "number" },
    userProfileIndex: { type: "number" },

    // -------------------------------------------------
    // Timestamps
    // -------------------------------------------------
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" }
  }
},
    


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

    License: {
      type: "object",
      required: [
        "licenseid",
        "version",
        "installdate",
        "enddate",
        "customerid",
        "productid",
        "description",
        "releaseyear"
      ],
      properties: {
        licenseid: {
          type: "string",
          example: "LIC-001"
        },
        version: {
          type: "string",
          example: "1.0.0"
        },
        installdate: {
          type: "string",
          example: "2024-01-01"
        },
        enddate: {
          type: "string",
          example: "2025-01-01"
        },
        customerid: {
          type: "string",
          example: "CUST-123"
        },

        // NEW FIELDS
        productid: {
          type: "string",
          example: "PROD-456"
        },
        description: {
          type: "string",
          example: "Enterprise license for Product X"
        },
        releaseyear: {
          type: "string",
          example: "2024"
        },

        createdAt: {
          type: "string"
        },
        updatedAt: {
          type: "string"
        }
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
