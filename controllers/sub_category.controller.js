const FetchSubCategoryService = require("../services/sub-categories/FetchSubCategoryService");

async function fetchSubCategoryController(req, res) {
    try {
        const { id, category } = req.query;

        const subCategoryData = await FetchSubCategoryService(id, category);

        return res.status(subCategoryData.status ? 200 : 404).json({
            status: subCategoryData.status,
            message: subCategoryData.status ? subCategoryData.message : "No Data Found!",
            count : subCategoryData.status ? subCategoryData.count : 0,
            data : subCategoryData.status ? subCategoryData.data : null
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}

module.exports = { fetchSubCategoryController }