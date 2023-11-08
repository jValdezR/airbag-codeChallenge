const UserService = require('./user.service');


class UserController{
  async createUser(req, res){
    const data = await UserService.createUser(req.body);
    res.json({
      ...data
    });
  };
  
  async readUser(req, res){
    const data = await UserService.readUser(req.query);
    res.json({
      ...data
    });
  };
}

module.exports = new UserController();
