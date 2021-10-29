const scoreRouter = require("express").Router();
const Configs = require("./../configs/Constants");
const {validateToken, validateLoginArgument, login, } = require("../middleware/auth-middleware/auth");
const {checkTargetAddScoreExist, checkTeacherOfVNUId, fAddScoreToScoresTable, fGetScoresByVNUId, fHandleUploadScore } = require("../middleware/score-middleware/score");
const { handleUploadFile } = require("../middleware/upload-middleware/upload");
// classRouter.get('/auth/test', validateToken);
// authRouter.post('/auth/reg', register);
scoreRouter.get(Configs.API_PATH.GET_SCORES_BY_ID, validateToken, checkTeacherOfVNUId, fGetScoresByVNUId);
scoreRouter.post(Configs.API_PATH.ADD_SCORE_BY_VNU_ID, checkTargetAddScoreExist, fAddScoreToScoresTable);
scoreRouter.post(Configs.API_PATH.UPLOAD_SV_MH_SCORE, handleUploadFile, fHandleUploadScore);
module.exports = scoreRouter;