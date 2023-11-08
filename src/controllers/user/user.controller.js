const UserService = require('./user.service');


class UserController{
  async createUser(req, res){
    const data = await UserService.createUser(req.body);
    res.json({
      ...data
    })
  };
  
  async readUser(req, res){
    res.json(await UserService.readUser());
  };
}

module.exports = new UserController();
