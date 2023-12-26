const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
}, {
    versionKey: false
})


const AdminModel = mongoose.model('admins', adminSchema);

module.exports = AdminModel;