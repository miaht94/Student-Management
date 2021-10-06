const {validateToken} = require('../middleware/auth-middleware/auth')
const {getProfileById, validateEditProfileArgument, editProfileById} = require('../middleware/user-middleware/user');
const userRouter = require('express').Router();
userRouter.get("/api/profile/:profileId", validateToken, getProfileById);
userRouter.post("/api/profile/edit/:profileId", validateEditProfileArgument, editProfileById);
module.exports = userRouter