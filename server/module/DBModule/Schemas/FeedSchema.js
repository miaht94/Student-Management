const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Configs = require('../../../configs/Constants');
const FeedSchema = new Schema({
    class_ref: {type: ObjectId, index : { unique: true }, required: true, ref: Configs.DB_SCHEMA.CLASS},
    posts : [{type: [ObjectId], ref: Configs.DB_SCHEMA.POST, default : []}]
})

const PostSchema = new Schema({
    from: {type: ObjectId, required: true, ref: Configs.DB_SCHEMA.USER},
    content: {type: String, default: "Posted"},
    comments: [{type: [ObjectId], ref: Configs.DB_SCHEMA.COMMENT, default: []}],
    created_date : {type: Number, default: new Date().getTime()},
    liked: [{type: [ObjectId], ref: Configs.DB_SCHEMA.USER, default: []}]
})

const CommentSchema = new Schema({
    from : {type: ObjectId, required: true, ref: Configs.DB_SCHEMA.USER},
    content: {type: String, default: "Commented"},
    created_date : {type: Number, default: new Date().getTime()}
})
module.exports = {FeedSchema, PostSchema, CommentSchema};