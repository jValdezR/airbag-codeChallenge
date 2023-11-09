const Joi = require('joi');

class UserVehicleValidator {

    // Schema for validating POST requests
    verifyPost = () => Joi.object().keys({
        userTerm: Joi.required(),
        vehicleTerm: Joi.string().required()
    });
}

module.exports = new UserVehicleValidator();
