const StateModel = require("../../models/state.model");

async function PostStatesService(countryID, name, status) {
    try {
        // Ensure that the name is in uppercase
        const capitalizedName = name.toUpperCase();

        // Check if the State with the same name already exists
        const existingState = await StateModel.findOne({ name: capitalizedName });
        if (existingState) {
            return {
                status: false,
                message: "State with the same name already exists",
            };
        }

        const createState = new StateModel({ countryID, name: capitalizedName, status });
        const savedState = await createState.save();

        return {
            status: true,
            message: "State created successfully",
            data: savedState
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = PostStatesService;
