/* eslint-disable no-undef */
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.ENVIRONMENT || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
	// If a specific environment variable is set, use it to connect to the database
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	// Otherwise, use the database configuration from config.js
	sequelize = new Sequelize(config.database, config.username, config.password, {
		...config,
	});
}

fs
	.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
		// Import and initialize each model and associate it with the Sequelize instance
		const model = require(path.join(__dirname, file))(sequelize, Sequelize);
		db[model.name] = model;
	});

// Associate models if associations are defined
Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync(); // Synchronize the database when there are changes in the tables

module.exports = db;
