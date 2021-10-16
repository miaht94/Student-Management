const jwt = require('jsonwebtoken');
const Configs = require('../../configs/Constants')
async function checkLoginInfo(socket, next) {
    try {
        var instance = await global.DBConnection.LoginInfo.findOne({current_token : socket.handshake.headers['x-auth-token']})
        socket.loginInfo = instance;
        instance.current_socket_id = socket.id;
        console.log("adawdawdwa")
        await instance.save();
        if (!instance) {
            next(new Error("TokenInvalid"));
        }
        next();
    } catch(e) {
        next(e);
    }
}

function checkTokenValid(socket, next) {
    try {
        var decoded = jwt.verify(socket.handshake.headers['x-auth-token'], Configs.SECRET_KEY);
        socket.senderVNUId = decoded.vnu_id;
        next()
    } catch(e) {
        next(new Error(e))
    }
}

module.exports = {checkLoginInfo, checkTokenValid};