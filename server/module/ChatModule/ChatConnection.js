const { Server } = require("socket.io");
const Configs = require('../../configs/Constants');
const jwtAuth = require("socketio-jwt-auth");
const {checkLoginInfo, checkTokenValid} = require('./ChatAuthentication');
class ChatConnection {
    constructor(server) {
        this.io = new Server(server);
        this.io.use(checkTokenValid);
        this.io.use(checkLoginInfo);
        this.io.on("connection", client => {
            console.log(client.senderVNUId);
            console.log(`New connection, ID[${client.id}]`);
            client.on("disconnect", () => {
                console.log(`ID[${client.id}] closed connection`)
                client.loginInfo.current_socket_id = null;
                try {
                client.loginInfo.save();
                } catch (e) {
                    console.log("Reset ID socket in DB error")
                }
            })
        })
    }
}
module.exports = ChatConnection;