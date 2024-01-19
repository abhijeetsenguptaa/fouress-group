const CityModel = require("../../models/city.model");

async function HandleStatusService(id) {
    try {
        const editingCityDetails = await CityModel.findById(id);

        if (!editingCityDetails) {
            return {
                status: false,
                message: "City not found!"
            };
        }

        editingCityDetails.status = !editingCityDetails.status;

        // Save the changes
        await editingCityDetails.save();

        return {
            status: true,
            message: "City status updated successfully"
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = HandleStatusService;
