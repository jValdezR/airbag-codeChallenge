const Joi = require('joi');

class VehicleValidator {
  // Validation schema for GET requests
  verifyGet() {
    return Joi.object().keys({
      term: Joi.string(),
    });
  }

  // Validation schema for POST requests
  verifyPost() {
    const customMessages = {
      'string.pattern.base': 'The "niv" does not match the NIV pattern.',
    };
    return Joi.object().keys({
      plate: Joi.string().required(),
      niv: Joi.string().pattern(/^[A-HJ-NPR-Z0-9]{17}$/).required().messages(customMessages),
      brand: Joi.string().valid('Mazda', 'Honda', 'Toyota', 'Renault', 'Volkswagen').required(),
      typeOfVehicle: Joi.string().valid('sedan', 'hb', 'suv', 'roadster').required(),
      price: Joi.number().min(0).required(),
    });
  }

  // Validation schema for PATCH requests
  verifyPatch() {
    const customMessages = {
      'alternatives.match': 'The "term" does not match a UUID or NIV.',
      'string.pattern.base': 'The "niv" does not match the NIV pattern.',
    };

    return Joi.object().keys({
      term: Joi.alternatives().try(
        Joi.string().guid({ version: ['uuidv4'] }), // Validate against UUID (version 4)
        Joi.string().pattern(/^[A-HJ-NPR-Z0-9]{17}$/) // Validate against NIV pattern
      ).required().messages(customMessages),
      plate: Joi.string().required(),
      niv: Joi.string().pattern(/^[A-HJ-NPR-Z0-9]{17}$/).messages(customMessages).required(),
      brand: Joi.string().valid('Mazda', 'Honda', 'Toyota', 'Renault', 'Volkswagen').required(),
      typeOfVehicle: Joi.string().valid('sedan', 'hb', 'suv', 'roadster').required(),
      price: Joi.number().min(0).required(),
    });
  }

  // Validation schema for DELETE requests
  verifyDelete() {
    return Joi.object().keys({
      term: Joi.string().required(),
    });
  }
}

module.exports = new VehicleValidator();
