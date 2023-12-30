const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    category_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
    bannerImage : {
        type : String,
        default: null
    },
    name : {
        type : String,
        default: null
    },
    subCategoryHeading : {
        type : String,
        default: null
    },
    subCategoryDescription : {
        type : String,
        default: null
    },
    stockHoldersHeading : {
        type : String,
        default: null
    },
    stockHoldersDescription : {
        type : String,
        default: null
    },
    specificationHeading : {
        type : String,
        default: null
    },
    specificationDescription : {
        type : String,
        default: null
    },
    productSizesHeading : {
        type : String,
        default: null
    },
    productSizesDescription : {
        type : String,
        default: null
    },
    productCompositionHeading: {
        type : String,
        default: null
    },
    productCompositionDescription : {
        type : String,
        default: null
    },
    productPropertiesHeading : {
        type : String,
        default: null
    },
    productPropertiesDescription : {
        type : String,
        default: null
    },
    productStockistHeading : {
        type : String,
        default: null
    },
    productStockistDescription : {
        type : String,
        default: null
    },
    productPriceListHeading : {
        type : String,
        default: null
    },
    productPriceListDescription : {
        type : String,
        default: null
    },
    productSupplyHeading : {
        type : String,
        default: null
    },
    productSupplyDescription : {
        type : String,
        default: null
    }
}, {
    versionKey: false
})

const Sub_Category_Model = mongoose.model('sub-categories', subCategorySchema);

module.exports = Sub_Category_Model;
