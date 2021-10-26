const chatRouter = require("express").Router();
const Configs = require("./../configs/Constants");
const {validateToken, validateLoginArgument, login, } = require("../middleware/auth-middleware/auth");
const {fGetRecentChat} = require('../middleware/chat-middleware/chat');
// chatRouter.post('/api/chat', validateToken);
chatRouter.post(Configs.API_PATH.RECENT_CHAT, validateToken, fGetRecentChat);
module.exports = chatRouter