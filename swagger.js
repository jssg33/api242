const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation for my Express app",
    },
  },
  apis: ["./routes/*.js"], // Path to your route files
};

module.exports = swaggerJsdoc(options);
