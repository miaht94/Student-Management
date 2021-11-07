const chatRouter = require("express").Router();
const Configs = require("./../configs/Constants");
const {validateToken, validateLoginArgument, login, } = require("../middleware/auth-middleware/auth");
const {fGetRecentContact,fGetRecentChat, fGetMessageByVNUId} = require('../middleware/chat-middleware/chat');
// chatRouter.post('/api/chat', validateToken);
chatRouter.get(Configs.API_PATH.RECENT_CHAT, validateToken, fGetRecentChat);
chatRouter.get(Configs.API_PATH.RECENT_CONTACT, validateToken, fGetRecentContact);
chatRouter.get(Configs.API_PATH.MESSAGES_BY_VNU_ID, validateToken, fGetMessageByVNUId);
module.exports = chatRouter