const bcrypt = require('bcrypt');
const AdminModel = require('../../models/admin.model');
async function RegisterAdminService(name, email, password) {
    try {
        const hashPassword = await bcrypt.hash(password, 6);
        const admin = new AdminModel({ name, email, password: hashPassword });
        await admin.save();
        
        return {
            status: true,
            message: "Registered Successfully",
            data: admin
        }
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}


module.exports = RegisterAdminService;