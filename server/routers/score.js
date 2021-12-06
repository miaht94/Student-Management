const scoreRouter = require("express").Router();
const Configs = require("./../configs/Constants");
const {validateToken, validateLoginArgument, login, } = require("../middleware/auth-middleware/auth");
const {fHandleUploadStatus, fGetScoresClassByClassId, checkTargetAddScoreExist, checkTeacherOfVNUId, fAddScoreToScoresTable, fGetScoresByVNUId, fHandleUploadScore, fUpdateStatus, fDownloadScoresClassByClassId } = require("../middleware/score-middleware/score");
const { handleUploadFile } = require("../middleware/upload-middleware/upload");
const {fFindClassByClassId, fCreateClass, validateClassTeacher, fAddMembersToClass, fGetCurClasses, handleUploadMembers, findClassByClassId, validateClassMember, fGetMemberBasicInfors, fDeleteMemberInClass} = require("../middleware/class-middleware/class");
// classRouter.get('/auth/test', validateToken);
// authRouter.post('/auth/reg', register);  
scoreRouter.get(Configs.API_PATH.DOWNLOAD_SCORES_CLASS, validateToken, findClassByClassId, validateClassTeacher, fDownloadScoresClassByClassId);
scoreRouter.post(Configs.API_PATH.ADD_SCORE_BY_VNU_ID, checkTargetAddScoreExist, fAddScoreToScoresTable);
scoreRouter.post(Configs.API_PATH.UPLOAD_SV_MH_SCORE, handleUploadFile, fHandleUploadScore);
scoreRouter.get(Configs.API_PATH.GET_SCORES_BY_ID, validateToken, checkTeacherOfVNUId, fGetScoresByVNUId);
scoreRouter.get(Configs.API_PATH.GET_SCORES_CLASS, validateToken, findClassByClassId,  validateClassTeacher, fGetScoresClassByClassId)
scoreRouter.post(Configs.API_PATH.UPLOAD_SV_STATUS, handleUploadFile, fHandleUploadStatus);

module.exports = scoreRouter;