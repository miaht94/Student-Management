const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Configs = require('../../../configs/Constants');
const ObjectId = Schema.Types.ObjectId;
const ChatSchema = new Schema({
    membersID : {type: [String], unique: true, default: ["admin1","admin2"], index: true},
    messages: [{type: [ObjectId], ref: Configs.DB_SCHEMA.MESSAGE}]
})
const MessageSchema = new Schema({
    from: {type: String, required:true},
    to: {type: String, required:true},
    createdDate: {type: Number, required:true}
})
module.exports = {ChatSchema, MessageSchema};