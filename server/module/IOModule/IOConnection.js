const io = require("socket.io");
const { v4: uuidv4 } = require('uuid');
const Configs = require('../../configs/Constants');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const jwtAuth = require("socketio-jwt-auth");
const handleChatMessage = require("./HandleChatMessage");
const {checkLoginInfo, checkTokenValid} = require('./IOAuthentication');
const {notifyNewPost, notifyNewComment, notifyUpdatePost} = require('./HandleNotification');
class IOConnection {
    constructor(server) {
        this.handleChatMessage = handleChatMessage;
        this.notifyNewPost = notifyNewPost.bind(this);
        this.notifyNewComment = notifyNewComment.bind(this);
        this.notifyUpdatePost = notifyUpdatePost.bind(this);
        this.io = io(server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
              }
        });
        this.io.use(checkTokenValid);
        this.io.use(checkLoginInfo);
        this.io.on("connection", async (socket) => {
            await handleNewConnection(socket);
            socket.loginInfo.populate("user_ref")
            console.log(`New connection, ID[${socket.id}]`);
            socket.on('NewMessage', this.handleChatMessage.bind(this, socket));
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
        global.IOConnection = this;
    }
    
}

const handleNewConnection = async (socket)=> {
    var sender =  await global.DBConnection.User.findOne({_id : socket.loginInfo.user_ref})
    if (!sender) return;
    if (sender.role == "teacher") {
        var classes = await global.DBConnection.Class.find({
            class_teacher: sender._id
        })
        for (var i of classes) {
            socket.join(i.class_id);
        }

    } else if (sender.role == "student") {
        var classes = await global.DBConnection.Class.find({
            class_members: sender._id
        })
        for (var i of classes) {
            socket.join(i.class_id);
        }
    }
}
module.exports = IOConnection;