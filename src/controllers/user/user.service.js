const sequelize = require('../../config/postgres');
const User = require('./entities/user.entity');

class UserService {

    async createUser(userObject) {
        try {
            const user = await User.create(userObject);
            return {
                status: 201,
                user: user.dataValues
            }
        } catch (error) {
            let message = 'Something goes wrong';
            if (error.name === 'SequelizeUniqueConstraintError')
                message = error.parent.detail;
            else if(error.name === 'SequelizeValidationError')
                message = error.errors[0].message
            return {
                status: 500,
                message
            }
        }
    }

    async readUser() {
        // try {
        //     const user = await User.findByPk(req.params.userId);
        //     if (user) {
        //       res.json(user);
        //     } else {
        //       res.status(404).json({ error: 'Usuario no encontrado' });
        //     }
        //   } catch (error) {
        //     res.status(500).json({ error: 'Error al leer el usuario' });
        //   }
        return 'ok';
    }
}


module.exports = new UserService();