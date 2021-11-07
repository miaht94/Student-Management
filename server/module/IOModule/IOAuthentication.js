const jwt = require('jsonwebtoken');
const Configs = require('../../configs/Constants')
async function checkLoginInfo(socket, next) {
    try {
        console.log("abc");
        var instance = await global.DBConnection.LoginInfo.findOne({user_ref : socket.senderVNUId})
        socket.loginInfo = instance;
        instance.current_socket_id = socket.id;
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
        console.log("abc");
        var decoded = null;
        if (socket.handshake.auth.token)
            decoded = jwt.verify(socket.handshake.auth.token, Configs.SECRET_KEY);
        if (socket.handshake.query.token)
            decoded = jwt.verify(socket.handshake.query.token, Configs.SECRET_KEY);
        if (socket.handshake.headers["x-auth-token"]) {
            decoded = jwt.verify(socket.handshake.headers["x-auth-token"], Configs.SECRET_KEY);
        }
        socket.senderVNUId = decoded.id;
        next()
    } catch(e) {
        next(new Error(e))
    }
}



module.exports = {checkLoginInfo, checkTokenValid};