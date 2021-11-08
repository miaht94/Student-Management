const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const handleChatMessage = async (socket, msg) => {
    console.log('New Chat Message: ' + msg.toString());
    let message, to, from;
    try {
        var toInstance = await global.DBConnection.User.findOne({vnu_id : msg.to});
        if (!toInstance) throw Error("Khong tim thay nguoi nhan tin nhan");
        message = msg.message;
        from = socket.loginInfo.user_ref
        to = new ObjectId(toInstance._id);
    } catch(e) {
        console.log("Du lieu message ko hop le");
        console.log(e);
        return;
    }
    let newMessage;
    let newFullyMessage;
    try {
        newMessage = new global.DBConnection.Message({
            from: new ObjectId(from._id),
            to: to,
            message: message,
            createdDate: new Date().getTime()
        })
        newMessage = await newMessage.save();
    } catch {
        console.log("Create or save message fail");
    
    }
    newFullyMessage = {
        from : from,
        to : toInstance,
        message: message,
        createdDate: newMessage.createdDate
    }
    let newContact = false;
    try {
        
        var chatRoom = await global.DBConnection.Chat.findOne({membersID : {$size: 2, $all : [ObjectId(socket.loginInfo.user_ref._id), ObjectId(toInstance._id)]}}).populate();
        if (!chatRoom) {
            chatRoom = new global.DBConnection.Chat({
                membersID : [new ObjectId(socket.loginInfo.user_ref._id), new ObjectId(toInstance._id)],
                messages: [new ObjectId(newMessage._id)]
            });
            
            chatRoom.save();
            newContact = true;
        } else {
            chatRoom.messages.push(new ObjectId(newMessage._id));
            chatRoom.save();
        }
    }
    catch(e) {
        console.log("Loi khi tim hoac khoi tao Chat Room");
        console.log(e);
        return;
    }
    newFullyMessage.newContact = newContact;
    try {
        var targetLoginInfo = await global.DBConnection.LoginInfo.findOne({user_ref: toInstance._id})
        var curTargetSocketID;
        if (!targetLoginInfo) {
            console.log("Khong tim thay nguoi nhan");
        } else {
            curTargetSocketID = targetLoginInfo.current_socket_id;
            if (curTargetSocketID) {
                let message = {
                    from: socket.loginInfo.user_ref.vnu_id,
                    message: msg.message
                }
                socket.to(curTargetSocketID).emit("NewMessage", {...newFullyMessage, isSender: false});
                console.log("Transfered message: ", message)
            }
            
        }
        if (socket.loginInfo.current_socket_id) 
                    socket.emit("NewMessage", {...newFullyMessage, selfSend: true, isSender: true});
    }
    catch(e) {
        console.log("Loi khi tim kiem target of message hoac khi gui message");
        return;
    }
}
module.exports = handleChatMessage 