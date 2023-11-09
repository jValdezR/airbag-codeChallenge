const { Op } = require('sequelize');
const { FREECURRENCYAPIKEY } = require('../../config/vars').api_keys;
const { vehicle: Vehicle } = require("../../database/models/index");

// Utility function to check if the given term matches the UUIDv4 pattern
const isUUIDv4 = (term) => {
    const uuidv4Pattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidv4Pattern.test(term);
};

let Freecurrencyapi;
let freecurrencyapi;
(async () => {
    // Dynamically import the Freecurrencyapi module and create an instance
    Freecurrencyapi = (await import('@everapi/freecurrencyapi-js')).default;
    freecurrencyapi = new Freecurrencyapi(FREECURRENCYAPIKEY);
})();

class VehicleService {
    // Create a new vehicle
    async createVehicle(vehicleObject) {
        try {
            const vehicle = await Vehicle.create(vehicleObject);
            return {
                status: 200,
                vehicle: vehicle.dataValues
            };
        } catch (error) {
            let message = 'Internal Server Error';
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
    async findVehicle({ term }) {
        try {
            let vehicle;
            if (!term) {
                vehicle = await Vehicle.findAll();
                return {
                    status: 201,
                    vehicles: vehicle
                };
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
                message: 'Internal Server Error'
            };
        }
    }

    // Update a vehicle based on term (either ID, NIV, or Plate)
    async updateVehicle({ term }, vehicleObject) {
        try {
            let { vehicle } = await this.findVehicle({ term });
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
            let message = 'Internal Server Error';
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
            const { vehicle } = await this.findVehicle({ term });
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
                message: 'Internal Server Error'
            };
        }
    }

    // Get vehicle prices in different currencies
    async getPrice() {
        try {
            let { vehicles } = await this.findVehicle({});
            const usd = await freecurrencyapi.latest({
                base_currency: 'MXN',
                currencies: 'USD'
            });
            const eur = await freecurrencyapi.latest({
                base_currency: 'MXN',
                currencies: 'EUR'
            });
            const gbp = await freecurrencyapi.latest({
                base_currency: 'MXN',
                currencies: 'GBP'
            });

            vehicles = vehicles.map((vehicle) => {
                const { price } = vehicle.dataValues;
                return {
                    ...vehicle.dataValues,
                    priceUSD: (price * usd.data.USD).toFixed(2),
                    priceEUR: (price * eur.data.EUR).toFixed(2),
                    priceGBP: (price * gbp.data.GBP).toFixed(2),
                };
            });

            return {
                status: 200,
                vehicles
            };
        } catch (error) {
            return {
                status: 500,
                message: 'Internal Server Error'
            };
        }
    }
}

module.exports = new VehicleService();
