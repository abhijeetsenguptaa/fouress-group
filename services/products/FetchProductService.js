const ProductModel = require("../../models/product.model");

async function FetchProductService(id, category, sub_category) {
    try {
        const query = {};
        if (id) {
            query._id = id; // Assuming id is the MongoDB document ID
        }
        if (category) {
            query.category = category;
        }
        if (sub_category) {
            query.sub_category = sub_category;
        }

        // Execute the query and return the result
        const result = await ProductModel.find(query);

        if (result.length === 0) {
            return {
                status: true,
                count: 0,
                message: 'Product not found',
            };
        }

        return {
            status: true,
            count: result.length,
            data: result,
        };
    } catch (error) {
        console.error(error);
        return {
            status: false,
            message: error.message,
        };
    }
}

module.exports = FetchProductService;
