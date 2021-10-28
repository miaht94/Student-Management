const scoreRouter = require("express").Router();
const Configs = require("./../configs/Constants");
const {validateToken, validateLoginArgument, login, } = require("../middleware/auth-middleware/auth");
// classRouter.get('/auth/test', validateToken);
// authRouter.post('/auth/reg', register);

module.exports = scoreRouter;