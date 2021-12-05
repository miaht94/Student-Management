const semesterRouter = require("express").Router();
const Configs = require("./../configs/Constants");
const {validateToken, validateLoginArgument, login, checkIsAdmin} = require("../middleware/auth-middleware/auth");
const { fAddSemester, fGetSemester, fHandleUploadSemester, fGetAllSemester } = require("../middleware/semester-middleware/semester");
const { handleUploadFile } = require("../middleware/upload-middleware/upload");
// classRouter.get('/auth/test', validateToken);
// authRouter.post('/auth/reg', register);
semesterRouter.post(Configs.API_PATH.ADD_SEMESTER, validateToken, fAddSemester)
semesterRouter.get(Configs.API_PATH.GET_SEMESTER_BY_ID, validateToken, fGetAllSemester)
semesterRouter.get(Configs.API_PATH.GET_SEMESTER_BY_ID, validateToken, fGetSemester)
semesterRouter.post(Configs.API_PATH.UPLOAD_SEMESTER, validateToken, handleUploadFile ,fHandleUploadSemester)
module.exports = semesterRouter;