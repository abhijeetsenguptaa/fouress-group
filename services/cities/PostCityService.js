const CityModel = require("../../models/city.model");

async function PostCityService(countryID, stateID, name, status, pincode) {
    try {
        // Ensure that the name is in uppercase
        const capitalizedName = name.toUpperCase();

        // Check if the City with the same name already exists
        const existingCity = await CityModel.findOne({ name: capitalizedName });
        if (existingCity) {
            return {
                status: false,
                message: "City with the same name already exists",
            };
        }

        const createCity = new CityModel({ countryID, stateID, name: capitalizedName, status, pincode });
        const savedCity = await createCity.save();

        return {
            status: true,
            message: "City created successfully",
            data: savedCity
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = PostCityService;
