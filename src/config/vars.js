// Import the 'dotenv' package to load environment variables from a .env file
require('dotenv').config();

// Export configuration objects containing environment variables
module.exports = {
  // Configuration for the server
  server: {
    // Environment variable for defining the server port
    PORT: process.env.PORT,
    API_KEY_NAME: process.env.API_KEY_NAME,
    API_KEY_VALUE: process.env.API_KEY_VALUE
  },
  // Configuration for API keys
  api_keys: {
    FREECURRENCYAPIKEY: process.env.FREECURRENCYAPIKEY
  },
  db: {
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT
  }
};
