const CityModel = require("../../models/city.model");


async function FetchCityService(id, status, stateID, pincode) {
    try {
        let cities;

        const query = {};

        if (id) {
            query._id = id;
        }

        if (status) {
            query.status = status;
        }

        if (stateID) {
            query.stateID = stateID;
        }

        if (pincode) {
            query.pincode = { $in: pincode };
        }

        cities = await CityModel.find(query)
            .populate('stateID', 'name')  // Assuming 'name' is the field you want to populate for the state
            .populate('countryID', 'name');


        return {
            status: true,
            message: "List of City.",
            data: cities
        }
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}


module.exports = FetchCityService;