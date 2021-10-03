const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hash = require("sha256");
const LoginInfoSchema = new Schema({
    vnu_id : {type: String, unique: true, dropDups: true},
    username: {type: String},
    password: {type : String, set: hash},
    current_token: {type: String, unique: true}
})

module.exports = LoginInfoSchema
