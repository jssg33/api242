const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GreenLicenseManager",
      version: "1.1.0",
      description: "API documentation for my Express License Manager App",
    },
  },
apis: ["./routes", "./"] // Path to your route files
};

module.exports = swaggerJsdoc(options);
