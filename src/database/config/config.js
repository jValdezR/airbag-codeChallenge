// importo el archivo de constantes globales
const config = require('../../config/vars').db;

module.exports = {

  "development": {
    "username": config.DB_USER,
    "password": config.DB_PASSWORD,
    "database": config.DB_NAME,
    "host": config.DB_HOST,
    "dialect": "postgres",
    "logging": false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": false
  }

}
