const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Configs = require('../../../configs/Constants');
const ObjectId = Schema.Types.ObjectId;
const ChatSchema = new Schema({
    membersID : [{type: ObjectId, ref: Configs.DB_SCHEMA.USER, index: true}],
    messages: [{type: ObjectId, ref: Configs.DB_SCHEMA.MESSAGE}]
})
const MessageSchema = new Schema({
    from: {type: ObjectId, ref: Configs.DB_SCHEMA.USER, required:true},
    to: {type: ObjectId, ref: Configs.DB_SCHEMA.USER, required:true},
    message: {type: String, default: ""},
    createdDate: {type: Number, required:true}
})
module.exports = {ChatSchema, MessageSchema};