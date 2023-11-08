const Joi = require('joi');

class UserValidator{

    verifyGet = () => Joi.object().keys({
        term: Joi.required()
    })

    verifyPost = () => Joi.object().keys({
        name: Joi.string().required(),
        phone: Joi.string().max(10),
        email: Joi.string().email().required()
    })
}

module.exports = new UserValidator();