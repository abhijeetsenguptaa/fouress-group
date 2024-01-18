const CountryModel = require("../../models/country.model");

async function HandleCountryStatus(id) {
    try {
        const editingCountryDetails = await CountryModel.findById(id);

        if (!editingCountryDetails) {
            return {
                status: false,
                message: "Country not found!"
            };
        }

        editingCountryDetails.status = !editingCountryDetails.status;

        // Save the changes
        await editingCountryDetails.save();

        return {
            status: true,
            message: "Country status updated successfully"
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = HandleCountryStatus;
