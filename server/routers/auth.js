const authRouter = require("express").Router();
const Configs = require("./../configs/Constants");
const {validateToken, validateLoginArgument, login, fForgetPassword } = require("../middleware/auth-middleware/auth");
authRouter.get('/auth/test', validateToken);
// authRouter.post('/auth/reg', register);
authRouter.post(Configs.API_PATH.LOGIN, validateLoginArgument, login);
authRouter.post(Configs.API_PATH.FORGET_PASSWORD, fForgetPassword);
module.exports = authRouter