const Configs = require('./../../configs/Constants')
const jwt = require('jsonwebtoken');
const hash = require('sha256')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport');
const { v4: uuidv4 } = require('uuid');
/** Xác định trạng thái của token có hợp lệ chưa
    req.authState được truyền vào req cùng senderVNUId và senderInstance*/
async function validateToken(req, res, next) {
    let token = req.cookies.token;
    try {
        // var decoded = jwt.verify(token, Configs.SECRET_KEY);
        if (!token) throw Error("TokenNotFound")
        var instance = await global.DBConnection.LoginInfo.findOne({current_token : token}).populate("user_ref");
        // console.log(instance.user_ref.name);
        if (instance != null) {
            req.authState = Configs.AUTH_STATE.AUTHORIZED;
            req.senderVNUId = instance.user_ref.vnu_id;
            req.isAdmin = instance.user_ref.role == "admin";
            req.senderInstance = instance.user_ref;
            if (req.senderInstance == null) throw Error("UserNotFound")
            next();
        } else {
            req.authState = Configs.AUTH_STATE.INVALID_AUTHORIZED;
            req.token = token;
            // next();
            throw Error("TokenInvalid");
        }
    
        } catch(err) {
        if (err.name == "TokenExpiredError") {
            res.status(410);
            res.send(Configs.RES_FORM("Error", {name : "TokenExpiredError", description: ""}));
            return;
        } else if (err.name == "JsonWebTokenError") {
            res.status(400);
            res.send(Configs.RES_FORM("Error", {name : err.name, description: err.message}));
            res.send(`${err.name} : ${err.message}`)
            return;
        } else if (err.name="TokenNotFound") {
            res.status(404)
            res.send(Configs.RES_FORM("Error", {name : err.name,description: ""}));
            return;
        }
        else if (err.name="UserNotFound") {
            res.status(400)
            res.send(Configs.RES_FORM("Error", {name : err.name,description: ""}));  
            return;
        } 
        else {
            res.status(400);
            res.send(Configs.RES_FORM("Error", {name : "UnknownError",description: err.toString()}));
            return;
        }
    }
}

/**
 * Call After validate token (have isAdmin ?)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function checkIsAdmin(req, res, next) {
    if (req.isAdmin) {
        next()
    } else {
        req.status(400)
        req.json(Configs.RES_FORM("Error", "Cần quyền của quản trị viên để thực hiện thao tác này"))
    }
}

function validateLoginArgument(req, res, next) {
    const rUsername = req.body.username;
    const rPassword = req.body.password;
    if (rPassword && rUsername) {
        next();
    } else {
        res.status(400);
        
        res.json(Configs.RES_FORM("Error", "Username and password must be filled"));
    }
}

async function login(req, res) {
    const rUsername = req.body.username;
    const rPassword = req.body.password;

    let userRef = await global.DBConnection.User.findOne({"vnu_id": rUsername})
    if (!userRef) {
        res.status(400);
        res.json(Configs.RES_FORM("Error", "Username hoặc Password chưa đúng"));
        return;
    }


    global.DBConnection.LoginInfo.findOne({"user_ref" : userRef._id, "password": rPassword},(err, instance) => {
        console.log(instance);
        if (instance != null) {
            let newToken = jwt.sign({id: instance.user_ref.toString(), createdDate: new Date().getTime()}, Configs.SECRET_KEY, {expiresIn: "2 days"})
            instance.current_token = newToken;
            instance.save();
            res.status(200);
            Configs.RES_FORM("Logged In Success", {"token": newToken})
            res.json(Configs.RES_FORM("Logged In Success", {"token": newToken}));
        } else {
            res.status(400);
            res.json(Configs.RES_FORM("Error", "Username hoặc Password chưa đúng"));
        }
    })
}
async function fForgetPassword(req, res) {
    var email = req.body.email;
    var email_owner = await global.DBConnection.User.findOne({email: email});
    if (!email_owner) {
        res.status(404);
        res.json(Configs.RES_FORM("Error", "Email không tồn tại trong hệ thống"))
        return
    }
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'vakoyomi@gmail.com',
          pass: 'Vietanh0911cc'
        }
      }));
      
      var newPassword = uuidv4();
      var mailOptions = {
        from: 'vakoyomi@gmail.com',
        to: email,
        subject: 'Website cố vấn học tập',
        text: 'Password mới của bạn là:' + newPassword
      };
      let temp = await global.DBConnection.LoginInfo.findOneAndUpdate({user_ref: email_owner._id},{password: newPassword}, {
        new: true
      });
      if (!temp) {
        res.status(404);
        res.json(Configs.RES_FORM("Error", "Có lỗi xảy ra"))
        return
      }
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(404);
          res.json(Configs.RES_FORM("Error", "Có lỗi xảy ra"))
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200);
          res.json(Configs.RES_FORM("Success", "Khôi phục thành công"))
        }
      });  
    
}
module.exports = {checkIsAdmin, validateToken, validateLoginArgument, login, fForgetPassword};