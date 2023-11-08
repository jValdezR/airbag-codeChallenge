const VehicleService = require('./vehicle.service');

class VehicleController {
    /**
     * Create a new vehicle.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     */
    async createVehicle(req, res) {
        try {
            const data = await VehicleService.createVehicle(req.body);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    /**
     * Read a vehicle (or vehicles) by providing search parameters.
     * @param {Object} req - Express request object with query parameters.
     * @param {Object} res - Express response object.
     */
    async readVehicle(req, res) {
        try {
            const data = await VehicleService.readVehicle(req.query);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    /**
     * Update a vehicle by providing search parameters and new data.
     * @param {Object} req - Express request object with query parameters and request body.
     * @param {Object} res - Express response object.
     */
    async updateVehicle(req, res) {
        try {
            const data = await VehicleService.updateVehicle(req.query, req.body);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    /**
     * Remove a vehicle by providing search parameters.
     * @param {Object} req - Express request object with query parameters.
     * @param {Object} res - Express response object.
     */
    async removeVehicle(req, res) {
        try {
            const data = await VehicleService.removeVehicle(req.query);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new VehicleController();
