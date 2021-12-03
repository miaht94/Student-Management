const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Configs = require('../../../configs/Constants');
const ObjectId = Schema.Types.ObjectId;
const ScoreSchema = new Schema({
    score: {type: Number, min: 0, max: 10, required : true},
    subject: {type: ObjectId, ref: Configs.DB_SCHEMA.SUBJECT, required: true},
    semester_id: {type: ObjectId, ref: Configs.DB_SCHEMA.SEMESTER, required: true}
})
const ScoresTableSchema = new Schema({
    user_ref: {type: ObjectId, ref: Configs.DB_SCHEMA.USER, required:true},
    scores : [{type: [ObjectId], ref: Configs.DB_SCHEMA.SCORE, default: []}],
    status: [{type: [String], default: []}]
})
module.exports = {ScoreSchema, ScoresTableSchema};