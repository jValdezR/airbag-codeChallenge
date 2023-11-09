// Import the necessary dependencies.
const express = require('express');
const {saveRequest} = require('../middlewares/logger.middleware');

// Create an instance of the Express Router to define application routes
const routes = express();

// Mount and use the defined routes from separate route modules
routes.use(
  saveRequest,
  require('./welcome.routes'), // Mounts the welcome routes
  require('./user.routes'), // Mounts the user routes
  require('./vehicle.routes'), //Mount the vehicle routes
  require('./user-vehicle.routes') //Mount the user-vehicle routes
);

// Export the configured Express Router instance containing all defined routes
module.exports = routes;
