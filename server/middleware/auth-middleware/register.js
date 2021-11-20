const { v4: uuidv4 } = require('uuid');
const Configs = require('./../../configs/Constants')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
const hash = require('sha256')
async function register(req, res) {
    let dupVNUId = await global.DBConnection.User.findOne({"vnu_id": req.body.vnu_id});
    
    if (dupVNUId) {
        res.status(409);
        res.json(Configs.RES_FORM("Error", "VNU-ID is already registered by someone"))
    } else {
        try {
            let newUserLoginInfo = new global.DBConnection.User({
                vnu_id : req.body.vnu_id ? req.body.vnu_id : uuidv4(),
                name: req.body.name,
                gender: req.body.gender,
                phone_number: req.body.phone_number,
                role: req.body.role,
                email: req.body.email,
                location: req.body.location,
                date_of_birth: req.body.dateOfBirth
            })
            newUserLoginInfo = await newUserLoginInfo.save()
            let newToken = jwt.sign({vnu_id: newUserLoginInfo.vnu_id, createdDate: new Date().getTime()}, Configs.SECRET_KEY, {expiresIn: 3600});
            // console.log("new token: ", newToken);
            let loginInfo = new global.DBConnection.LoginInfo({
                user_ref : new ObjectId(newUserLoginInfo._id),
                password: req.body.password,
                current_token: newToken,
                current_socket_id: null,
            });
            
            await loginInfo.save();
            res.status(200);
            res.json(Configs.RES_FORM("Success", {"token" : loginInfo.current_token}))
        } catch (e) {
            res.status(400);
 
            res.json(Configs.RES_FORM("Error", e.message))
            return;
        }          
    }


}

module.exports = {register};