const {validateToken} = require('../middleware/auth-middleware/auth')
const {getProfileById, validateEditProfileArgument, editProfileById} = require('../middleware/user-middleware/user');
const Config = require('../configs/Constants');
const uploadRoute = require('express').Router();
const {fHandleUploadDSCV} = require('../middleware/upload-middleware/upload')
uploadRoute.post(Config.API_PATH.UPLOAD_DSCV, fHandleUploadDSCV);
module.exports = userRouter;