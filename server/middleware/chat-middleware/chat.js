
const Configs = require('./../../configs/Constants')

/** Trả về các cuộc hội thoại của current user theo order Date và kèm theo tin nhắn mới nhất.
 * Tiên quyết : validateToken (req.senderInstance, req.senderVNUId)
*/
async function fGetRecentChat(req, res) {
    let chatRoom = await global.DBConnection.Chat.find({membersID : {$all: [req.senderInstance._id] }}).populate('messages');
    res.status(200);
    res.send(JSON.stringify(chatRoom));
}

module.exports = {fGetRecentChat}