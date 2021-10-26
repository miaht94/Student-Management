const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hash = require("sha256");
const Configs = require('../../../configs/Constants');
const ObjectId = Schema.Types.ObjectId;
const SubScoreSchema = new Schema({
    user_ref : {type: ObjectId, unique: true, ref: Configs.DB_SCHEMA.USER},
    score: {type: Number},
    subject: {type: ObjectId, ref: Configs.DB_SCHEMA.SUBJECT},
    
})

module.exports = LoginInfoSchema
