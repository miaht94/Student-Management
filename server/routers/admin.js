const adminRouter = require("express").Router();
const Configs = require("./../configs/Constants");
const {validateToken, validateLoginArgument, login, } = require("../middleware/auth-middleware/auth");
const { validateAdmin, fGetAllUserInfo } = require("../middleware/admin-middleware/admin");
adminRouter.get(Configs.API_PATH.ADMIN_GET_ALL_USERS, validateToken, validateAdmin, fGetAllUserInfo);

module.exports = adminRouter;