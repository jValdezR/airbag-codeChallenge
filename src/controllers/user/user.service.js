const {user : User} = require('../../database/models/index');
// Function to check if the provided term matches a UUIDv4 pattern
const isUUIDv4 = (term) => {
	const uuidv4Pattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
	return uuidv4Pattern.test(term);
};

class UserService {
	// Create a new user based on the userObject received
	async createUser(userObject) {
		try {
			const user = await User.create(userObject);
			return {
				status: 200,
				user: user.dataValues
			};
		} catch (error) {
			let message = 'Internal Server Error';
			let status = 500;
			if (error.name === 'SequelizeUniqueConstraintError'){
				status = 400;
				message = error.parent.detail;
			}
                
			else if (error.name === 'SequelizeValidationError'){
				status= 400;
				message = error.errors[0].message;
			}
                
			return {
				status,
				message
			};
		}
	}

	// Read user data based on the provided term, which can be an email or phone
	async findUser({ term }) {
		try {
			let user;
			if(!term){
				user = await User.findAll();
				return {
					status: 200,
					users: user
				};
			}
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
				});
			}
			if (user) {
				return {
					status: 200,
					user
				};
			} else {
				return {
					status: 404,
					message: 'User Not Found.'
				};
			}
		} catch (error) {
			return {
				status: 500,
				message: 'Internal Server Error'
			};
		}
	}
}

module.exports = new UserService(); // Export an instance of the UserService class
