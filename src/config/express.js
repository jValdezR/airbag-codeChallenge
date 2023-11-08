// Import required modules and packages
const cors = require('cors'); // Middleware for handling Cross-Origin Resource Sharing (CORS).
const helmet = require('helmet'); // Middleware for setting secure HTTP headers.
const morgan = require('morgan'); // Middleware for logging HTTP requests.
const express = require('express'); // Web application framework for Node.js.

// Import application routes
const routes = require('../router/index.routes'); // Application routes defined in another file.
const { limit, cors_allowed, debug } = require('./vars').server; // Configuration and environment variables.

// Create an instance of the Express application
const app = express();

// Configure the request body limit (JSON and URL-encoded parsing)
app.use(express.json({ limit })); // Middleware for parsing JSON request bodies.
app.use(express.urlencoded({ limit, extended: true })); // Middleware for parsing URL-encoded request bodies.

// Log requests if debugging is enabled
if (debug === 'true') {
    app.use(morgan('tiny')); // Use 'morgan' middleware with 'tiny' format to log requests.
}

// Apply the 'helmet' middleware to enhance application security
app.use(helmet());

// Configure the 'cors' middleware to handle CORS policy for requests
app.use(cors({ origin: cors_allowed }));

// Use the routes defined in the 'index.routes.js' file
app.use('/api', routes);

// Export the configured Express application instance
module.exports = app;
