const swaggerJsdoc = require("swagger-jsdoc");

// All schemas and paths live in @swagger blocks inside ./routes/*.js, next to
// the routes they describe. Do not add inline components/paths here — they
// silently override the route-file definitions when names collide.
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GreenLicenseManager",
      version: "1.1.0",
      description: "API documentation for all legacy endpoints"
    }
  },

  apis: ["./routes/*.js", "./Audit/routes/*.js", "./server.js"]
};

module.exports = swaggerJsdoc(options);
