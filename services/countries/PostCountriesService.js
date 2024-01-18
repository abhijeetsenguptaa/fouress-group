const CountryModel = require("../../models/country.model");

async function PostCountriesService(name, status) {
    try {
        // Ensure that the name is in uppercase
        const capitalizedName = name.toUpperCase();

        // Check if the country with the same name already exists
        const existingCountry = await CountryModel.findOne({ name: capitalizedName });
        if (existingCountry) {
            return {
                status: false,
                message: "Country with the same name already exists",
            };
        }

        const createCountry = new CountryModel({ name: capitalizedName, status });
        const savedCountry = await createCountry.save();

        return {
            status: true,
            message: "Country created successfully",
            data: savedCountry
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = PostCountriesService;
