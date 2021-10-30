const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hash = require("sha256");
const Configs = require('../../../configs/Constants');
const ObjectId = Schema.Types.ObjectId;
const LoginInfoSchema = new Schema({
    user_ref : {type: ObjectId, unique: true, ref: Configs.DB_SCHEMA.USER},
    username: {type: String},
    password: {type : String, set: hash},
    current_token: {type: String, unique: true},
    current_socket_id: {type: String, default: null}
})

module.exports = LoginInfoSchema
