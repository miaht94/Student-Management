const Configs = require('./../../configs/Constants')
const jwt = require('jsonwebtoken');
const hash = require('sha256')
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

/** Tiên quyết: validateToken  có senderInstance*/
function validateAdmin(req, res, next) {
    if (req.senderInstance.role ==  'admin') next();
    else {
        res.status(400);
        res.json(Configs.RES_FORM("Error", "Bạn không phải là admin"))
    }
}

async function fGetAllUserInfo(req, res) {
    var users = await global.DBConnection.User.find({});
    res.status(200);
    res.json(Configs.RES_FORM("Success", users));
}

module.exports = {validateAdmin, fGetAllUserInfo};