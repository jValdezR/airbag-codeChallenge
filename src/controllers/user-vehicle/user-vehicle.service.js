const { findUser } = require('../user/user.service');
const { findVehicle } = require('../vehicle/vehicle.service');

class UserVehicleService {

    //Create a user-vehicle association.

    async createUserVehicle(userTerm, vehicleTerm) {
        try {
            // Retrieve the user based on the provided userTerm.
            const { user } = await findUser({ term: userTerm });

            // Retrieve the vehicle based on the provided vehicleTerm.
            const { vehicle } = await findVehicle({ term: vehicleTerm });

            // If the user is not found, return a 404 error response.
            if (!user) {
                return {
                    status: 404,
                    message: 'User Not Found'
                };
            }

            // If the vehicle is not found, return a 404 error response.
            if (!vehicle) {
                return {
                    status: 404,
                    message: 'Vehicle not found'
                };
            }

            // Associate the vehicle with the user by setting the userId property.
            vehicle.userId = user.id;

            // Save the updated vehicle with the new association.
            await vehicle.save();

            // Return a success response.
            return {
                status: 201,
                message: 'Created'
            };
        } catch (error) {
            // Handle and log any errors that occur during the process.
            console.error(error);
        }
    }
}

module.exports = new UserVehicleService();
