
const { readUser } = require('../user/user.service');
const { readVehicle } = require('../vehicle/vehicle.service');
class UserVehicleService {

    async createUserVehicle(userTerm, vehicleTerm) {
        try {
            const {user} = await readUser({term: userTerm});
        const {vehicle} = await readVehicle({term: vehicleTerm});

        if (!user)
            return {
                status: 404,
                message: 'User not found'
            }
        if (!vehicle)
            return {
                status: 404,
                message: 'Vehicle not found'
            }
        
            vehicle.userId = user.id;
            await vehicle.save();

            return {
                status:201,
                message: 'created'
            }
        } catch (error) {
            console.log(error);
        }
        
    }
}

module.exports = new UserVehicleService();