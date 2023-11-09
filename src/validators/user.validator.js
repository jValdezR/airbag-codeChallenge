const Joi = require('joi');

class UserValidator {
    // Schema for validating GET requests
    verifyGet = () => Joi.object().keys({
        term: Joi.optional()
    });

    // Schema for validating POST requests
    verifyPost = () => Joi.object().keys({
        name: Joi.string().min(3).required(),
        phone: Joi.string().max(10), // Allowing a maximum of 10 characters for the phone
        email: Joi.string().email().required() // Ensuring that the email follows the email format
    });
}

module.exports = new UserValidator();
