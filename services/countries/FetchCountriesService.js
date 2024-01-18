const CountryModel = require("../../models/country.model");

async function FetchCountriesService(id, status) {
    try {
        let countries;

        const query = {};

        if (id) {
            query._id = id;
        }

        if (status) {
            query.status = status;
        }

        countries = await CountryModel.find(query)

        return {
            status: true,
            message: "List of countries.",
            data: countries
        }
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}


module.exports = FetchCountriesService;