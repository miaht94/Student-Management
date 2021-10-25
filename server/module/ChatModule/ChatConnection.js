const { Server } = require("socket.io");
const { v4: uuidv4 } = require('uuid');
const Configs = require('../../configs/Constants');
const jwtAuth = require("socketio-jwt-auth");
const {checkLoginInfo, checkTokenValid} = require('./ChatAuthentication');
class ChatConnection {
    constructor(server) {
        this.io = new Server(server);
        this.io.use(checkTokenValid);
        this.io.use(checkLoginInfo);
        this.io.on("connection", socket => {
            console.log(socket.senderVNUId);
            console.log(`New connection, ID[${socket.id}]`);
            socket.on('ChatMessage', this.handleNewMessage.bind(this, socket));
              socket.on("disconnect", () => {
                console.log(`ID[${socket.id}] closed connection`)
                socket.loginInfo.current_socket_id = null;
                try {
                    socket.loginInfo.save();
                } catch (e) {
                    console.log("Reset ID socket in DB error")
                }
            })
        })
    }
    handleNewMessage = async (socket, msg) => {
        console.log('New Chat Message: ' + msg);
        let message, from, to;
        try {
            message = msg.message;
            from = msg.from;
            to = msg.to;
        } catch(e) {
            console.log("Du lieu message ko hop le");
            return;
        }
        let newMessage;
        try {
            newMessage = new global.DBConnection.Message({
                from: from,
                to: to,
                createdDate: new Date().getTime()
            })
            newMessage = await newMessage.save();
        } catch {
            console.log("Create or save message fail");
        }
        
        try {
            var chatRoom = await global.DBConnection.Chat.findOne({membersID : {$size: 2, $all : [from, to]}});
            if (!chatRoom) {
                chatRoom = new global.DBConnection.Chat({
                    membersID : [from, to],
                    messages: [newMessage._id]
                })
            } else {
                chatRoom.messages.push(new ObjectID(newMessage._id));
                chatRoom.save();
            }
        }
        catch(e) {
            console.log("Loi khi tim hoac khoi tao Chat Room");
            console.log(e);
            return;
        }

        try {
            var targetLoginInfo = await global.DBConnection.LoginInfo.findOne({vnu_id: to})
            var curTargetSocketID;
            if (!targetLoginInfo) {
                console.log("Khong tim thay nguoi nhan");
            } else {
                curTargetSocketID = targetLoginInfo.current_socket_id;
                if (!curTargetSocketID) return;
                else {
                    socket.to(curTargetSocketID).emit("NewChatMessage", msg);
                }
            }
        }
        catch(e) {
            console.log("Loi khi tim kiem target of message hoac khi gui message");
            return;
        }


    }
}
module.exports = ChatConnection;