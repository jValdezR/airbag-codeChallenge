const { logger : Logger } = require('../database/models/index');

class LoggerMiddleware {
	// Middleware to save request information to the database
	async saveRequest(req, res, next) {
		// Extract relevant request information
		const requestInfo = {
			method: req.method,
			url: req.url,
			timestamp: new Date(),
		};

		try {
			// Save the request information to the database using the Logger model
			await Logger.create(requestInfo);
			next(); // Continue processing the request
		} catch (error) {
			// Handle database insertion error
			res.status(500).json({
				message: 'Internal Server Error',
			});
		}
	}
}

module.exports = new LoggerMiddleware();
