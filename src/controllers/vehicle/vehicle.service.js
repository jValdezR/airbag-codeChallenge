const { Op } = require('sequelize');
const {Vehicle} = require("../../database/models/index");

// Check if the given term matches the UUIDv4 pattern
const isUUIDv4 = (term) => {
    const uuidv4Pattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidv4Pattern.test(term);
}

class VehicleService {

    // Create a new vehicle
    async createVehicle(vehicleObject) {
        try {
            const vehicle = await Vehicle.create(vehicleObject);
            return {
                status: 201,
                vehicle: vehicle.dataValues
            };
        } catch (error) {
            let message = 'Something went wrong';
            let status = 500;
            if (error.name === 'SequelizeUniqueConstraintError') {
                message = error.parent.detail;
                status = 400;
            } else if (error.name === 'SequelizeValidationError') {
                message = error.errors[0].message;
                status = 400;
            }
            return {
                status,
                message
            };
        }
    }

    // Read a vehicle by term (either ID, NIV, or Plate)
    async readVehicle({ term }) {
        try {
            let vehicle;
            if(!term){
                vehicle = await Vehicle.findAll();
                return {
                    status: 201,
                    vehicles: vehicle
                }
            }

            if (isNaN(term)) {
                if (isUUIDv4(term)) {
                    vehicle = await Vehicle.findByPk(term);
                } else {
                    vehicle = await Vehicle.findOne({
                        where: {
                            [Op.or]: [{ niv: term }, { plate: term }]
                        }
                    });
                }
            }

            if (vehicle) {
                return {
                    status: 200,
                    vehicle
                };
            } else {
                return {
                    status: 404,
                    message: 'Vehicle not found'
                };
            }
        } catch (error) {
            return {
                status: 500,
                message: 'Something went wrong'
            };
        }
    }

    // Update a vehicle based on term (either ID, NIV, or Plate)
    async updateVehicle({ term }, vehicleObject) {
        try {
            let { vehicle } = await this.readVehicle({ term });
            if (vehicle) {
                // Determine the update condition based on term
                let updateCondition;
                if (isUUIDv4(term)) {
                    updateCondition = { where: { id: term } };
                } else {
                    updateCondition = { where: { niv: term } };
                }

                // Update the vehicle in the database
                await Vehicle.update(
                    { ...vehicle.dataValues, ...vehicleObject },
                    updateCondition
                );

                vehicle = { ...vehicle.dataValues, ...vehicleObject };

                return {
                    status: 200,
                    vehicle
                };
            } else {
                return {
                    status: 404,
                    message: 'Vehicle not found'
                };
            }
        } catch (error) {
            let message = 'Something went wrong';
            let status = 500;
            if (error.name === 'SequelizeUniqueConstraintError') {
                message = error.parent.detail;
                status = 400;
            } else if (error.name === 'SequelizeValidationError') {
                message = error.errors[0].message;
                status = 400;
            }
            return {
                status,
                message
            };
        }
    }

    // Remove a vehicle by term (either ID, NIV, or Plate)
    async removeVehicle({ term }) {
        try {
            const { vehicle } = await this.readVehicle({ term });
            if (vehicle) {
                await Vehicle.destroy({ where: { id: vehicle.id } });
                return {
                    status: 200,
                    message: 'Vehicle removed'
                };
            } else {
                return {
                    status: 404,
                    message: 'Vehicle not found'
                };
            }
        } catch (error) {
            return {
                status: 500,
                message: 'Something went wrong'
            };
        }
    }
}

module.exports = new VehicleService();
