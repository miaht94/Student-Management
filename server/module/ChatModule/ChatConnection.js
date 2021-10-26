const { Server } = require("socket.io");
const { v4: uuidv4 } = require('uuid');
const Configs = require('../../configs/Constants');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const jwtAuth = require("socketio-jwt-auth");
const {checkLoginInfo, checkTokenValid} = require('./ChatAuthentication');
class ChatConnection {
    constructor(server) {
        this.io = new Server(server);
        this.io.use(checkTokenValid);
        this.io.use(checkLoginInfo);
        this.io.on("connection", socket => {
            socket.loginInfo.populate("user_ref")
            console.log(`New connection, ID[${socket.id}]`);
            socket.on('NewMessage', this.handleNewMessage.bind(this, socket));
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
        
        try {
            
            var chatRoom = await global.DBConnection.Chat.findOne({membersID : {$size: 2, $all : [ObjectId(socket.loginInfo.user_ref._id), ObjectId(toInstance._id)]}}).populate();
            if (!chatRoom) {
                chatRoom = new global.DBConnection.Chat({
                    membersID : [new ObjectId(socket.loginInfo.user_ref._id), new ObjectId(toInstance._id)],
                    messages: [new ObjectId(newMessage._id)]
                });
                chatRoom.save();
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

        try {
            var targetLoginInfo = await global.DBConnection.LoginInfo.findOne({vnu_id: toInstance.vnu_id})
            var curTargetSocketID;
            if (!targetLoginInfo) {
                console.log("Khong tim thay nguoi nhan");
            } else {
                curTargetSocketID = targetLoginInfo.current_socket_id;
                if (!curTargetSocketID) return;
                else {
                    socket.to(curTargetSocketID).emit("NewMessage", {
                        from: socket.loginInfo.user_ref.vnu_id,
                        message: msg.message
                    });
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