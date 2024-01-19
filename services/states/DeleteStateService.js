const StateModel = require("../../models/state.model");

async function DeleteStatesService(id) {
    try {
        // Find the state by ID
        const deletedState = await StateModel.findByIdAndDelete(id);

        if (!deletedState) {
            return {
                status: false,
                message: "State not found or already deleted"
            };
        }

        return {
            status: true,
            message: "State deleted successfully"
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeleteStatesService;
