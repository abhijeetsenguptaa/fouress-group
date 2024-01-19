const PostCityService = require("../services/cities/PostCityService");
const FetchCityService = require("../services/cities/FetchCityService");
const EditCityService = require("../services/cities/EditCityService");
const HandleStatusService = require("../services/cities/HandleStatusService");
const DeleteCityService = require("../services/cities/DeleteCItyService");

async function PostCityController(req, res) {
    try {
        const { countryID, stateID, name, status, pincode } = req.body;

        const cityCreation = await PostCityService(countryID, stateID, name, status, pincode);

        return res.status(cityCreation.status ? 200 : 404).json({
            status: cityCreation.status,
            message: cityCreation.message,
            data: cityCreation.status ? cityCreation.data : null
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}

async function FetchCityController(req,res){
    try {
        const { id, status, stateID, pincode } = req.query;

        const fetchedData = await FetchCityService(id, status, stateID, pincode)

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


async function EditCityController(req,res){
    try {
        const id = req.params.id;
        const { countryID, stateID, name, status, pincode } = req.body;

        const editedDetails = await EditCityService(id, countryID, stateID, name, status, pincode);

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

async function DeleteCityController(req, res) {
    try {
        const id = req.params.id;

        const deletedItem = await DeleteCityService(id);

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

async function StatusCityController(req, res) {
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



module.exports = { PostCityController, FetchCityController, EditCityController, DeleteCityController, StatusCityController };