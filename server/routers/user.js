const {validateToken} = require('../middleware/auth-middleware/auth')
const {getProfileById, validateEditProfileArgument, editProfileById} = require('../middleware/user-middleware/user');
const Config = require('../configs/Constants');
const userRouter = require('express').Router();
userRouter.get(Config.API_PATH.PROFILE_BY_ID , validateToken, getProfileById);
userRouter.post(Config.API_PATH.SET_PROFILE_BY_ID, validateToken, validateEditProfileArgument, editProfileById);
module.exports = userRouter;