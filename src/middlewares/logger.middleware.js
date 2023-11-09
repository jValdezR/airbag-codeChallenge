const {logger : Logger} = require('../database/models/index');

class LoggerMiddleware{
  async saveRequest(req, res, next) {
    const requestInfo = {
      method: req.method,
      url: req.url,
      timestamp: new Date(),
    };
    try {
      await Logger.create(requestInfo);
      next();
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error'
      });
    }
    
  
  }
}



module.exports = new LoggerMiddleware();
