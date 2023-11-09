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
  async findUser(req, res) {
    try {
      const data = await UserService.findUser(req.query);
      // Respond with the data received from the user service
      if (data.status != 200)
        res.status(data.status).json({message: data.message});
      res.status(data.status).json(data.user ? data.user : data.users);
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error'
      })
    }
  }
}

module.exports = new UserController(); // Export an instance of the UserController class
