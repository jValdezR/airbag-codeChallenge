const userVehicleService = require("./user-vehicle.service");


class UserVehicleController{

    async createUserVehicle(req, res){
        const {userTerm, vehicleTerm} = req.body;
        const data = await userVehicleService.createUserVehicle(userTerm, vehicleTerm);
        res.json({
            ...data
        }) 
    }

}


module.exports = new UserVehicleController();