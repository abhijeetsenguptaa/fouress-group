const CountryModel = require("../../models/country.model");

async function DeleteCountriesService(id) {
    try {
        // Find the country by ID
        const deletedCountry = await CountryModel.findByIdAndDelete(id);

        if (!deletedCountry) {
            return {
                status: false,
                message: "Country not found or already deleted"
            };
        }

        return {
            status: true,
            message: "Country deleted successfully"
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeleteCountriesService;
