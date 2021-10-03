const Configs = require('./../../configs/Constants')
const jwt = require('jsonwebtoken');
const hash = require('sha256')
function verify_token(req, res) {
    if (req.headers.authorization) {
        let token = req.headers.authorization.replace("Bearer ", "");
        try {
            var decoded = jwt.verify(token, Configs.SECRET_KEY);
            global.DBConnection.LoginInfo.findOne({current_token : token}, ((err, instance) => {
                if (instance != null) {
                    req.authState = Configs.AUTH_STATE.AUTHORIZED
                    next();
                } else {
                    req.authState = Configs.AUTH_STATE.INVALID_AUTHORIZED;
                    req.token = token;
                    next();
                }
            }))
          } catch(err) {
            if (err.name == "TokenExpiredError") {
                res.status(410);
                res.send("Token Expired");
            } else if (err.name == "JsonWebTokenError") {
                res.status(400);
                res.send(`${err.name} : ${err.message}`)
            } else {
                res.status(400);
                res.send("Unknown Error: \n" + err.toString())
            }
        }
    } else {
        req.authState = Configs.AUTH_STATE.UNAUTHORIZED
        next();
    }
}
function validateLoginArgument(req, res, next) {
    const rUsername = req.body.username;
    const rPassword = req.body.password;
    if (rPassword && rUsername) {
        next();
    } else {
        res.status(400);
        res.json({"Status" : "Error", "message: " : "Username and password must be filled"});
    }
}
function login(req, res) {
    const rUsername = req.body.username;
    const rPassword = req.body.password;

    global.DBConnection.LoginInfo.findOne({"username": rUsername, "password": rPassword},(err, instance) => {
        console.log(instance);
        if (instance != null) {
            let newToken = jwt.sign({username: instance.username, curDate: new Date().getTime()}, Configs.SECRET_KEY, {expiresIn: 3600})
            instance.current_token = newToken;
            instance.save();
            res.status(200);
            res.json({"status": "Logged In Success", "message" : {"token": newToken}});
        } else {
            res.status(400);
            res.json({"status": "Login Error", "message" : "Invalid username or password"});
        }
    })
}

module.exports = {verify_token, validateLoginArgument, login};