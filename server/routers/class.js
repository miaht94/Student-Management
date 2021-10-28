const classRouter = require("express").Router();
const Configs = require("./../configs/Constants");
const {validateToken, validateLoginArgument, login, } = require("../middleware/auth-middleware/auth");
const {fFindClassByClassId, fCreateClass, validateClassTeacher, fAddMembersToClass, fGetCurClasses, findClassByClassId, validateClassMember, fGetMemberBasicInfors} = require("../middleware/class-middleware/class");
// classRouter.get('/auth/test', validateToken);
// authRouter.post('/auth/reg', register);
classRouter.post(Configs.API_PATH.CREATE_CLASS, validateToken, fCreateClass);
classRouter.post(Configs.API_PATH.ADD_MEMBER_CLASS, validateToken,findClassByClassId, validateClassTeacher, fAddMembersToClass);
classRouter.get(Configs.API_PATH.MY_CLASS, validateToken, fGetCurClasses)
classRouter.get(Configs.API_PATH.MY_CLASS_MEMBERS_INFORS, validateToken, findClassByClassId, validateClassMember, fGetMemberBasicInfors)
classRouter.get(Configs.API_PATH.GET_CLASS_BY_ID, validateToken, findClassByClassId, fFindClassByClassId);
module.exports = classRouter