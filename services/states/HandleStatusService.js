const StateModel = require("../../models/state.model");

async function HandleStatusService(id) {
    try {
        const editingStateDetails = await StateModel.findById(id);

        if (!editingStateDetails) {
            return {
                status: false,
                message: "State not found!"
            };
        }

        editingStateDetails.status = !editingStateDetails.status;

        // Save the changes
        await editingStateDetails.save();

        return {
            status: true,
            message: "State status updated successfully"
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = HandleStatusService;
