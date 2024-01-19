const mongoose = require('mongoose');


const stateSchema = new mongoose.Schema({
    countryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'countries'
    },
    name: {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    }
},{
    versionKey: false
})


const StateModel = mongoose.model('states', stateSchema);

module.exports = StateModel;