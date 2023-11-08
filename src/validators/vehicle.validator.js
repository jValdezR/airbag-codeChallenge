const Joi = require('joi');

class VehicleValidator {
  verifyGet() {
    return Joi.object().keys({
      term: Joi.string(),
    });
  }

  verifyPost() {
    const customMessages = {
        'string.pattern.base': 'The "niv" does not match with NIV pattern.',
      };
    return Joi.object().keys({
      plate: Joi.string().required(),
      niv: Joi.string().pattern(/^[A-HJ-NPR-Z0-9]{17}$/).required().messages(customMessages),
      brand: Joi.string().valid('Mazda', 'Honda', 'Toyota', 'Renault', 'Volkswagen').required(),
      typeOfVehicle: Joi.string().valid('sedan', 'hb', 'suv', 'roadster').required(),
      price: Joi.number().min(0).required(),
    });
  }

  verifyPatch() {
    const customMessages = {
      'alternatives.match': 'The "term" does not match with a UUID or NIV.',
    };

    return Joi.object().keys({
      term: Joi.alternatives().try(
        Joi.string().guid({ version: ['uuidv4'] }),
        Joi.string().pattern(/^[A-HJ-NPR-Z0-9]{17}$/)
      ).required().messages(customMessages),
      plate: Joi.string().required(),
      niv: Joi.string().pattern(/^[A-HJ-NPR-Z0-9]{17}$/).required(),
      brand: Joi.string().valid('Mazda', 'Honda', 'Toyota', 'Renault', 'Volkswagen').required(),
      typeOfVehicle: Joi.string().valid('sedan', 'hb', 'suv', 'roadster').required(),
      price: Joi.number().min(0).required(),
    });
  }

  verifyDelete() {
    return Joi.object().keys({
      term: Joi.string().required(),
    });
  }
}

module.exports = new VehicleValidator();
