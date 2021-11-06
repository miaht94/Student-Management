
const Configs = require('./../../configs/Constants')

/** Trả về các cuộc hội thoại của current user theo order Date và kèm theo tin nhắn mới nhất.
 * Tiên quyết : validateToken (req.senderInstance, req.senderVNUId)
*/
async function fGetRecentChat(req, res) {
    let chatRoom = await global.DBConnection.Chat.find({membersID : {$all: [req.senderInstance._id] }}).populate('messages');
    res.status(200);
    res.send(Configs.RES_FORM("Success",chatRoom));
}

/**Trả về cuộc hội thoại với 1 người nào đó 
 * Tiên quyết: Đã có vnu_id của họ trong params của request, đã validateToken (có senderInstance).
 * @param {*} req 
 * @param {*} res 
 */
async function fGetMessageByVNUId(req, res) {
    let otherVNUId = req.params.otherVNUId;
    let otherInstance = await global.DBConnection.User.findOne({vnu_id : otherVNUId});
    if (otherInstance) {
        let chatRoom = await global.DBConnection.Chat.findOne({membersID : {$size: 2, $all : [req.senderInstance._id, otherInstance._id]}})
        .populate(
            {
                path : 'messages',
                populate : {
                    path : 'from'
                }
            })
            .populate(
                {
                    path : 'messages',
                    populate : {
                        path : 'to'
                    }
                });
        res.status(200);
        res.send(Configs.RES_FORM("Success",chatRoom.messages))

    } else {
        res.status(400);
        res.json(Configs.RES_FORM("Error"), "Không tìm thấy đối tượng cần xem tin nhắn");
    }
}
/** Trả về các liên hệ gần đây và info của họ.
 * Tiên quyết : validateToken (req.senderInstance, req.senderVNUId)
*/
async function fGetRecentContact(req, res) {
    let chatRoom = await global.DBConnection.Chat.find({membersID : {$size: 2, $all: [req.senderInstance._id] }}).populate('membersID');;
    let contacts = [];
    for (var i of chatRoom) {
        if (i.membersID[0]._id.toHexString() == req.senderInstance._id.toHexString())
            contacts.push(i.membersID[1]);
        else 
            contacts.push(i.membersID[0]);
    }
    res.status(200);
    res.send(Configs.RES_FORM("Success",contacts));
}
module.exports = {fGetRecentContact, fGetRecentChat,fGetMessageByVNUId}