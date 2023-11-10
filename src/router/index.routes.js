// Import the necessary dependencies.
const express = require('express');
const {saveRequest} = require('../middlewares/logger.middleware');
const { verifyApiKey } = require('../middlewares/security.middleware');

// Swagger disabled for docker
// const swaggerUi = require('swagger-ui-express');
// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerSpec = require('./swagger');

// Create an instance of the Express Router to define application routes
const routes = express();

// Mount and use the defined routes from separate route modules
routes.use(
  // '/docs/', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerSpec)), //uncomment for swagger
  require('./welcome.routes'), // Mounts the welcome routes
  verifyApiKey, // Middleware for security
  saveRequest,  // Middleare to save all request
  require('./user.routes'), // Mounts the user routes
  require('./vehicle.routes'), //Mount the vehicle routes
  require('./user-vehicle.routes') //Mount the user-vehicle routes
);

// Export the configured Express Router instance containing all defined routes
module.exports = routes;
