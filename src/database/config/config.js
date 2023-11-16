const config = require('../../config/vars').db;

module.exports = {
	// Development environment configuration
	'development': {
		'username': config.DB_USER,      // Database username from configuration
		'password': config.DB_PASSWORD,  // Database password from configuration
		'database': config.DB_NAME,      // Database name from configuration
		'host': config.DB_HOST,          // Database host from configuration
		'port': config.DB_PORT,          // Database port from configuration
		'dialect': 'postgres',           // Database dialect (PostgreSQL)
		'logging': false                // Disable query logging
	},
	// Test environment configuration
	'test': {
		'username': 'root',              // Default username for testing
		'password': null,                // Default password for testing
		'database': 'database_test',      // Default test database name
		'host': '127.0.0.1',             // Default test database host
		'dialect': 'postgres',           // Database dialect (PostgreSQL)
		'logging': false                // Disable query logging
	},
	// Production environment configuration
	'production': {
		'username': 'root',              // Default username for production
		'password': null,                // Default password for production
		'database': 'database_production', // Default production database name
		'host': '127.0.0.1',             // Default production database host
		'dialect': 'postgres',           // Database dialect (PostgreSQL)
		'logging': false                // Disable query logging
	}
};
