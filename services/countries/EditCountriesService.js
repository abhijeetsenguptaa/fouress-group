const CountryModel = require("../../models/country.model");

async function EditCountriesService(id, name, status) {
    try {
        const editingCountryDetails = await CountryModel.findById(id);

        if (!editingCountryDetails) {
            return {
                status: false,
                message: "Country not found!"
            };
        }

        // Update the fields if new values are provided, otherwise keep the existing values
        editingCountryDetails.name = name || editingCountryDetails.name;
        editingCountryDetails.status = status || editingCountryDetails.status;

        // Save the changes
        await editingCountryDetails.save();

        return {
            status: true,
            message: "Country updated successfully"
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = EditCountriesService;
