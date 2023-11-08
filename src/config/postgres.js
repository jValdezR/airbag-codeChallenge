// Import the Sequelize library (ORM) for Node.js
const Sequelize = require('sequelize');

// Import database configuration variables (DB_NAME, DB_USER, DB_PASSWORD, DB_HOST) from the 'vars.js' file
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = require('./vars').db;

// Create a Sequelize instance and configure it with the database connection details
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,          // Database host
  dialect: 'postgres',    // Specifies the SQL dialect to be used (in this case, PostgreSQL)
  logging: false,         // Disable SQL query logging to the console
});

// Export the configured Sequelize instance for use in other parts of the application

(async () => {
  try {
    await sequelize.sync(); // Sync database with app entities
    console.log('Sync Database');
  } catch (error) {
    console.error(error);
  }
})();

module.exports = sequelize;
