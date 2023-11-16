const { verifyPost, verifyGet } = require('../validators/user.validator');

class UserMiddleware {
	// Middleware function to verify POST requests using user.validator
	async verifyPost(req, res, next) {
		try {
			// Validate the request body using the verifyPost schema
			await verifyPost().validateAsync({ ...req.body });
			// If validation is successful, continue to the next middleware or route handler
			next();
		} catch (error) {
			// If validation fails, respond with a 406 status and the validation error message
			res.status(406).json({ message: error.details[0].message });
		}
	}

	// Middleware function to verify GET requests using user.validator
	async verifyGet(req, res, next) {
		try {
			// Validate the request query parameters using the verifyGet schema
			await verifyGet().validateAsync({ ...req.query });
			// If validation is successful, continue to the next middleware or route handler
			next();
		} catch (error) {
			// If validation fails, respond with a 406 status and the validation error message
			res.status(406).json({ message: error.details[0].message });
		}
	}
}

module.exports = new UserMiddleware();
