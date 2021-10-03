const { register } = require("../middleware/auth-middleware/register");
const registerRouter = require('express').Router();
registerRouter.post('/reg', register);

module.exports = registerRouter