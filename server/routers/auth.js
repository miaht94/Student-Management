const authRouter = require("express").Router();
const Configs = require("./../configs/Constants");
const {verify_token, validateLoginArgument, login, } = require("../middleware/auth-middleware/auth");
//authRouter.get('/auth', verify_token);
// authRouter.post('/auth/reg', register);
authRouter.post('/auth/login', validateLoginArgument, login);
module.exports = authRouter