const LoginAdminService = require("../services/admin/LoginAdminService");
const RegisterAdminService = require("../services/admin/RegisterAdminService");

async function registeringAdminController(req, res) {
    try {
        const { name, email, password } = req.body;
        const registeringAdmin = await RegisterAdminService(name, email, password);

        return res.status(registeringAdmin.status ? 200 : 404).json({
            status: registeringAdmin.status,
            message: registeringAdmin.message,
            data: registeringAdmin.status ? registeringAdmin.data : null
        })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}

async function loggingAdminController(req, res) {
    try {
        const { email, password } = req.body;

        const loggingAdmin = await LoginAdminService(email, password);

        return res.status(loggingAdmin.status ? 200 : 404).json({
            status: loggingAdmin.status,
            message: loggingAdmin.message,
            token: loggingAdmin.status ? loggingAdmin.token : 'You are not Authorized.'
        })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}

module.exports = { registeringAdminController, loggingAdminController }