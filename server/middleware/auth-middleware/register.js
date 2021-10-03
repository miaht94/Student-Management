const { v4: uuidv4 } = require('uuid');
const Configs = require('./../../configs/Constants')
const jwt = require('jsonwebtoken');
const hash = require('sha256')
function register(req, res) {
    global.DBConnection.LoginInfo.findOne({"username": req.body.username}, (err, instance) => {
        if (instance != null) {
            console.log(req.body.username);
            res.status(409);
            res.json({"status":"Error", "message": "Username is already registered by someone"})
        } else {
            let newUserLoginInfo = new global.DBConnection.User({
                vnu_id : uuidv4(),
                name: req.body.name,
                role: req.body.role,
                email: req.body.email,
                date_of_birth: req.body.dateOfBirth
            })
            newUserLoginInfo.save();
            let newToken = jwt.sign({username: req.body.username, curDate: new Date().getTime()}, Configs.SECRET_KEY, {expiresIn: 3600});
            console.log("new token: ", newToken);
            let loginInfo = new global.DBConnection.LoginInfo({
                vnu_id : newUserLoginInfo.vnu_id,
                username: req.body.username,
                password: req.body.password,
                current_token: newToken
            });
            loginInfo.save().then(() => {
                res.json({"status": "Success", "message":{"token" : loginInfo.current_token}})
            });
            
        }
    })

}

module.exports = {register};