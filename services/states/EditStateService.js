const StateModel = require("../../models/state.model");

async function EditStatesService(id, name, status, countryID) {
    try {
        const editingStateDetails = await StateModel.findById(id);

        if (!editingStateDetails) {
            return {
                status: false,
                message: "State not found!"
            };
        }

        // Update the fields if new values are provided, otherwise keep the existing values
        editingStateDetails.countryID = editingStateDetails.countryID || countryID;
        editingStateDetails.name = name || editingStateDetails.name;
        editingStateDetails.status = status || editingStateDetails.status;

        // Save the changes
        await editingStateDetails.save();

        return {
            status: true,
            message: "State updated successfully"
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = EditStatesService;
