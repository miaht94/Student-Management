const classRouter = require("express").Router();
const Configs = require("./../configs/Constants");
const {validateToken, validateLoginArgument, login, } = require("../middleware/auth-middleware/auth");
const {createClass, validateClassTeacher, addMembersToClass, getCurClass} = require("../middleware/class-middleware/class");
// classRouter.get('/auth/test', validateToken);
// authRouter.post('/auth/reg', register);
classRouter.post(Configs.API_PATH.CREATE_CLASS, validateToken, createClass);
classRouter.post(Configs.API_PATH.ADD_MEMBER_CLASS, validateToken, validateClassTeacher, addMembersToClass);
classRouter.get(Configs.API_PATH.MY_CLASS, validateToken, getCurClass)
module.exports = classRouter