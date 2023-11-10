const { verifyPost, verifyGet, verifyPatch } = require("../validators/vehicle.validator");

class UserMiddleware {
  async verifyPost(req, res, next) {
    try {
      // Validate the request body using the 'verifyPost' schema.
      await verifyPost().validateAsync({ ...req.body });
      next();
    } catch (error) {
      res.status(406).json({ message: error.details[0].message });
      // Return a 406 (Not Acceptable) status code with the validation error message.
    }
  }

  async verifyPatch(req, res, next) {
    try {
      // Validate the request body and query parameters using the 'verifyPatch' schema.
      await verifyPatch().validateAsync({
        ...req.body,
        ...req.query
      });
      next();
    } catch (error) {
      res.status(406).json({ message: error.details[0].message });
      // Return a 406 (Not Acceptable) status code with the validation error message.
    }
  }

  async verifyGet(req, res, next) {
    try {
      // Validate the request query parameters using the 'verifyGet' schema.
      await verifyGet().validateAsync({ ...req.query });
      next();
    } catch (error) {
      res.status(406).json({ message: error.details[0].message });
      // Return a 406 (Not Acceptable) status code with the validation error message.
    }
  }

  async verifyDelete(req, res, next) {
    try {
      // Validate the request query parameters using the 'verifyGet' schema.
      await verifyGet().validateAsync({ ...req.query });
      next();
    } catch (error) {
      res.status(406).json({ message: error.details[0].message });
      // Return a 406 (Not Acceptable) status code with the validation error message.
    }
  }
}

module.exports = new UserMiddleware();
