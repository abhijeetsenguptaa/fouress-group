const mongoose = require('mongoose');


const citySchema = new mongoose.Schema({
    countryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'countries'
    },
    stateID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'states'
    },
    name: {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    },
    pincode:{
        type: [String], 
        default: []
    }
},{
    versionKey: false
})


const CityModel = mongoose.model('cities', citySchema);

module.exports = CityModel;