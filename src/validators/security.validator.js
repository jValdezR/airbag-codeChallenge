const Joi = require('joi');

const { API_KEY_NAME, API_KEY_VALUE } = require('../config/vars').server;
class SecurityValidator {
  verifyApiKey = () => {
    const securityObj = {};
    securityObj[`${API_KEY_NAME}`] = Joi.string().required().valid(API_KEY_VALUE);
    return Joi.object().keys({ ...securityObj }).options({ allowUnknown: true, stripUnknown: true });
  }
}

module.exports = new SecurityValidator();