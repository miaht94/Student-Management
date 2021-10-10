const authRouter = require("express").Router();
const Configs = require("./../configs/Constants");
const {validateToken, validateLoginArgument, login, } = require("../middleware/auth-middleware/auth");
authRouter.get('/auth/test', validateToken);
// authRouter.post('/auth/reg', register);
authRouter.post(Configs.API_PATH.LOGIN, validateLoginArgument, login);
module.exports = authRouter