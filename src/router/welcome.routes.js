// Import the necessary dependencies.
const express = require('express');
const welcomeController = require('../controllers/welcome/welcome.controller');

// Create an instance of an Express router.
const welcomeRouter = express.Router();

// Define a route for handling HTTP GET requests at the root path ('/') using the 'welcome' method from the welcome controller.
welcomeRouter.get('/', welcomeController.welcome);

// Export the router to be used in other parts of the application.
module.exports = welcomeRouter;
