/* eslint-disable linebreak-style */
const {verifyApiKey} = require('../validators/security.validator');
class SecurityMiddleware {
	async verifyApiKey(req, res, next) {
		try {
			const headers = {...req.headers};
			await verifyApiKey().validateAsync(headers);
			next();
		} catch (error) {
			res.status(401).json({ status: false, message: 'Unauthorized, invalid x-api-key', data: null });
		}
	}
}

module.exports = new SecurityMiddleware();