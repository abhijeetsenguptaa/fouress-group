const CityModel = require("../../models/city.model");

async function EditCityService(id, countryID, stateID, name, status, pincode) {
    try {
        const editingCityDetails = await CityModel.findById(id);

        if (!editingCityDetails) {
            return {
                status: false,
                message: "City not found!"
            };
        }

        // Update the fields if new values are provided, otherwise keep the existing values
        editingCityDetails.countryID = countryID || editingCityDetails.countryID;
        editingCityDetails.stateID = stateID || editingCityDetails.stateID;
        editingCityDetails.name = name || editingCityDetails.name;
        editingCityDetails.status = status || editingCityDetails.status;
        editingCityDetails.pincode = pincode || editingCityDetails.pincode;

        // Save the changes
        await editingCityDetails.save();

        return {
            status: true,
            message: "City updated successfully"
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = EditCityService;
