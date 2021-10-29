const subjectRouter = require("express").Router();
const Configs = require("./../configs/Constants");
const {validateToken, validateLoginArgument, login, } = require("../middleware/auth-middleware/auth");
const { fAddSubject } = require("../middleware/subject-middleware/subject");
// classRouter.get('/auth/test', validateToken);
// authRouter.post('/auth/reg', register);
subjectRouter.post(Configs.API_PATH.ADD_SUBJECT, fAddSubject);
module.exports = subjectRouter;