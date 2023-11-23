require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateToken(userID) {
    const token = jwt.sign({ "userID": userID }, process.env.SECRET_KEY);
    return token;
}


module.exports = generateToken;