const DeleteCountriesService = require("../services/countries/DeleteCountriesService");
const EditCountriesService = require("../services/countries/EditCountriesService");
const FetchCountriesService = require("../services/countries/FetchCountriesService");
const HandleCountryStatus = require("../services/countries/HandleCountryStatus");
const PostCountriesService = require("../services/countries/PostCountriesService");

async function PostCountryController(req, res) {
    try {
        const { name, status } = req.body;

        const countryCreation = await PostCountriesService(name, status);

        return res.status(countryCreation.status ? 200 : 404).json({
            status: countryCreation.status,
            message: countryCreation.message,
            data: countryCreation.status ? countryCreation.data : null
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}

async function EditCountryController(req, res) {
    try {
        const id = req.params.id;
        const { name, status } = req.body;

        const editedDetails = await EditCountriesService(id, name, status);

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

async function FetchCountryController(req, res) {
    try {
        const { id, status } = req.query;

        const fetchedData = await FetchCountriesService(id, status);

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

async function DeleteCountryController(req, res) {
    try {
        const id = req.params.id;

        const deletedItem = await DeleteCountriesService(id);

        return res.status(deletedItem.status ? 200: 404).json({
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

async function StatusCountryController(req, res) {
    try {
        const id = req.params.id;

        const statusChanger = await HandleCountryStatus(id);

        return res.status(statusChanger.status ? 200: 404).json({
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

module.exports = { PostCountryController, EditCountryController, FetchCountryController, DeleteCountryController, StatusCountryController };