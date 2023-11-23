const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String,
    password: String
}, {
    versionKey: false
})


const UserModel = mongoose.model('users', userSchema);


module.exports = UserModel