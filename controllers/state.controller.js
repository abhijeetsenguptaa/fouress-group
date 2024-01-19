const DeleteStatesService = require("../services/states/DeleteStateService");
const EditStatesService = require("../services/states/EditStateService");
const FetchStatesService = require("../services/states/FetchStateService");
const HandleStatusService = require("../services/states/HandleStatusService");
const PostStatesService = require("../services/states/PostStateService");

async function PostStateController(req, res) {
    try {
        const { countryID, name, status } = req.body;

        const StateCreation = await PostStatesService(countryID, name, status);

        return res.status(StateCreation.status ? 200 : 404).json({
            status: StateCreation.status,
            message: StateCreation.message,
            data: StateCreation.status ? StateCreation.data : null
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}

async function EditStateController(req, res) {
    try {
        const id = req.params.id;
        const { countryID, name, status } = req.body;

        const editedDetails = await EditStatesService(id, name, status, countryID);

        return res.status(editedDetails.status ? 200 : 404).json({
            status: editedDetails.status,
            message: editedDetails.message
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}

async function FetchStateController(req, res) {
    try {
        const { id, status, countryID } = req.query;

        const fetchedData = await FetchStatesService(id, status, countryID);

        return res.status(fetchedData.status ? 200 : 404).json({
            status: fetchedData.status,
            message: fetchedData.message,
            data: fetchedData.status ? fetchedData.data : null
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}

async function DeleteStateController(req, res) {
    try {
        const id = req.params.id;

        const deletedItem = await DeleteStatesService(id);

        return res.status(deletedItem.status ? 200 : 404).json({
            status: deletedItem.status,
            message: deletedItem.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}

async function StatusStateController(req, res) {
    try {
        const id = req.params.id;

        const statusChanger = await HandleStatusService(id);

        return res.status(statusChanger.status ? 200 : 404).json({
            status: statusChanger.status,
            message: statusChanger.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}

module.exports = { PostStateController, EditStateController, FetchStateController, DeleteStateController, StatusStateController };