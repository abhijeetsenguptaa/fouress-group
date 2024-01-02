const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
    sub_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sub_categories'
    }
}, {
    versionKey: false
})

const ProductModel = mongoose.model('products', productSchema);

module.exports = ProductModel;