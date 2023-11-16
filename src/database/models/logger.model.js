module.exports = (sequelize, Sequelize) =>{
	const {DataTypes} = Sequelize;

	let Logger = sequelize.define('logger', {
		method: {
			type: DataTypes.STRING,
			allowNull: false, // No se permite un valor nulo
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	return Logger;
};