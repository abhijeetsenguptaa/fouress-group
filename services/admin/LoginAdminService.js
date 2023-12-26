const bcrypt = require('bcrypt');
const AdminModel = require('../../models/admin.model');
const generateToken = require('../../utils/generateToken');

async function LoginAdminService(email, password) {
    try {
        if (!email || !password) {
            return {
                status: false,
                message: 'Please enter your email address and password.'
            };
        }

        const userData = await AdminModel.findOne({ email });

        if (!userData) {
            return {
                status: false,
                message: 'Invalid email address or password.'
            };
        }

        const token = await generateToken(userData._id);
        const match = await bcrypt.compare(password, userData.password);

        if (match) {
            return {
                status: true,
                message: 'Login successful.',
                token : token
                // You may include additional data here, e.g., user ID, etc.
            };
        } else {
            return {
                status: false,
                message: 'Invalid email address or password.'
            };
        }
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = LoginAdminService;
