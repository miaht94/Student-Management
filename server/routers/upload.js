const {validateToken} = require('../middleware/auth-middleware/auth')
const {getProfileById, validateEditProfileArgument, editProfileById} = require('../middleware/user-middleware/user');
const Config = require('../configs/Constants');
const uploadRoute = require('express').Router();
const {handleUploadFile, fHandleUploadDSCV, fHandleUploadFile} = require('../middleware/upload-middleware/upload')


uploadRoute.post(Config.API_PATH.UPLOAD_FILE, handleUploadFile, fHandleUploadFile);
uploadRoute.post(Config.API_PATH.UPLOAD_DSCV, handleUploadFile, fHandleUploadDSCV);
module.exports = uploadRoute;