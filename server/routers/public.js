const {validateToken} = require('../middleware/auth-middleware/auth')
const {getProfileById, validateEditProfileArgument, editProfileById} = require('../middleware/user-middleware/user');
const Config = require('../configs/Constants');
const publicRoute = require('express').Router();
const {fGetPublicData} = require('../middleware/public-middleware/public');
publicRoute.get(Config.API_PATH.PUBLIC_DATA, fGetPublicData);
module.exports = publicRoute;