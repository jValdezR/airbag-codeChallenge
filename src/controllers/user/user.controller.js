const UserService = require('./user.service');

class UserController {
    /**
     * Create a new user.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
  async createUser(req, res) {
    const data = await UserService.createUser(req.body);
    // Respond with the data received from the user service
    res.json({ ...data });
  }

  /*
  * Read a user (or users) by providing search parameters.
  * @param {Object} req - Express request object with query parameters.
  * @param {Object} res - Express response object.
  */
  async readUser(req, res) {
    const data = await UserService.readUser(req.query);
    // Respond with the data received from the user service
    res.json({ ...data });
  }
}

module.exports = new UserController(); // Export an instance of the UserController class
