const mongoose = require('mongoose');


const countrySchema = new mongoose.Schema({
    name : {
        type: String,
        default : null
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false
})


const CountryModel = mongoose.model('countries', countrySchema);

module.exports = CountryModel;