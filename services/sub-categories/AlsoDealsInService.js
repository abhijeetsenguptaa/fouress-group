const Sub_Category_Model = require("../../models/sub_category.model");

async function AlsoDealsInService(id) {
    try {
        const requiredItem = await Sub_Category_Model.findById(id);

        if (!requiredItem) {
            return {
                status: false,
                message: "Item not found!"
            };
        }

        const relatedItems = await Sub_Category_Model.find({ category_id: requiredItem.category_id, _id: { $ne: id } });

        return {
            status: true,
            message: "List of the related items",
            // data: requiredItem,
            relatedItem : relatedItems
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = AlsoDealsInService;
