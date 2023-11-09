const userVehicleService = require("./user-vehicle.service");

class UserVehicleController {
    /**
     * Create a new user-vehicle association.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async createUserVehicle(req, res) {
        try {
            // Extract user and vehicle information from the request body.
            const { userTerm, vehicleTerm } = req.body;

            // Call the service to create the user-vehicle association.
            const data = await userVehicleService.createUserVehicle(userTerm, vehicleTerm);

            // Respond with the created association data.
            res.status(data.status).json({ message: data.message });
        } catch (error) {
            // Handle any errors and send an appropriate response.
            res.status(500).json({ error: "Failed to create user-vehicle association" });
        }
    }
}

module.exports = new UserVehicleController();
