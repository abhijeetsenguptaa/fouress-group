const CityModel = require("../../models/city.model");

async function DeleteCityService(id) {
    try {
        // Find the City by ID
        const deletedCity = await CityModel.findByIdAndDelete(id);

        if (!deletedCity) {
            return {
                status: false,
                message: "City not found or already deleted"
            };
        }

        return {
            status: true,
            message: "City deleted successfully"
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeleteCityService;
