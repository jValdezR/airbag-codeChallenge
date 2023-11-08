const {verifyPost} = require("../validators/user.validator");

class UserMiddleware {
    async verifyPost(req, res, next) {
        try {
            await verifyPost().validateAsync({...req.body});
                next();
        } catch (error) {
            res.status(406).json({details:error.details[0].message});
        }
    }
}

module.exports = new UserMiddleware();