module.exports = (sequelize, Sequelize) =>{
	const {DataTypes} = Sequelize;
	// Define the model for the "User" entity
	let User = sequelize.define('user', {
		// Define the "id" attribute as a UUID with an automatically generated default value
		id: {
			type: DataTypes.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true, // It's a primary key
		},
		// Define the "name" attribute as a string that cannot be null
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate:{
				len: [3, Infinity]
			}
		},
		// Define the "phone" attribute as a string that can be null and must be unique
		phone: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true,
		},
		// Define the "email" attribute as a string that cannot be null, must be unique, and validate it as an email
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true, // Apply validation to ensure it's a valid email address
			}
		},
	});

	User.associate = models => {
		User.hasMany(models.vehicle);
	};
	return User;
};