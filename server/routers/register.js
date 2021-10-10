const { register } = require("../middleware/auth-middleware/register");
const Config = require("../configs/Constants");
const registerRouter = require('express').Router();
registerRouter.post(Config.API_PATH.REG_ACC, register);

module.exports = registerRouter