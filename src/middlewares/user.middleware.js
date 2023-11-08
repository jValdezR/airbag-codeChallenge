const {verifyPost, verifyGet} = require("../validators/user.validator");

class UserMiddleware {
    async verifyPost(req, res, next) {
        try {
            await verifyPost().validateAsync({...req.body});
                next();
        } catch (error) {
            res.status(406).json({details:error.details[0].message});
        }
    }

    async verifyGet(req, res, next) {
        try {
            await verifyGet().validateAsync({...req.query});
                next();
        } catch (error) {
            res.status(406).json({details:error.details[0].message});
        }
    }
}

module.exports = new UserMiddleware();