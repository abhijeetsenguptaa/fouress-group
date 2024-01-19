const StateModel = require("../../models/state.model");

async function FetchStatesService(id, status, countryID) {
    try {
        let states;

        const query = {};

        if (id) {
            query._id = id;
        }

        if (status) {
            query.status = status;
        }

        if (countryID) {
            query.countryID = countryID;
        }

        states = await StateModel.find(query)

        return {
            status: true,
            message: "List of States.",
            data: states
        }
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}


module.exports = FetchStatesService;