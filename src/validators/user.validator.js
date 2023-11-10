const Joi = require('joi');

class UserValidator {
    // Schema for validating GET requests
    verifyGet = () => Joi.object().keys({
        term: Joi.alternatives().try(
            Joi.string().email(), 
            Joi.string().max(10).pattern(/^[0-9]+$/),
            Joi.string().guid({ version: ['uuidv4'] }),
          ),
    });

    // Schema for validating POST requests
    verifyPost () {
        const customMessages= {
            "string.pattern.base": "Phone contains letters."
        };
        return Joi.object().keys({
            name: Joi.string().min(3).required(),
            phone: Joi.string().max(10).pattern(/^[0-9]+$/).messages(customMessages).required(), // Allowing a maximum of 10 numbers for the phone
            email: Joi.string().email().required() // Ensuring that the email follows the email format
        });
    }
}

module.exports = new UserValidator();
