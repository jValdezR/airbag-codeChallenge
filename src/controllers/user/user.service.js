const { Op } = require('sequelize');
const User = require('./entities/user.entity');

const isUUIDv4 = (term) => {
    const uuidv4Pattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidv4Pattern.test(term);
}

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
            let status = 400;
            if (error.name === 'SequelizeUniqueConstraintError')
                message = error.parent.detail;
            else if (error.name === 'SequelizeValidationError')
                message = error.errors[0].message
            return {
                status,
                message
            }
        }
    }

    async readUser({ term }) {
        try {
            let user;

            if (isNaN(term)) {
                if (isUUIDv4(term)) {
                    user = await User.findByPk(term);
                }
                else {
                    user = await User.findOne({
                        where: { email: term }
                    });
                }
            }
            else {
                user = await User.findOne({
                    where: { phone: term }
                })
            }
            if (user) {
                return {
                    status: 202,
                    user
                }
            } else {
                return {
                    status: 404,
                    message: 'User not found'
                }
            }
        } catch (error) {
            return {
                status: 500,
                message: 'Something goes Wrong'
            }
        }
    }
}


module.exports = new UserService();