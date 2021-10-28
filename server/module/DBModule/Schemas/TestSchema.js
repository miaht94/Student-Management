const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hash = require("sha256");
const Configs = require('../../../configs/Constants');
const ObjectId = Schema.Types.ObjectId;
const TestSchema = new Schema({
    // user_ref : {type: ObjectId, unique: true, ref: Configs.DB_SCHEMA.USER},
    // score: {type: Number, min: 0, max: 10},
    // abc: {type: String, unique: true}
    // subject: {type: ObjectId, ref: Configs.DB_SCHEMA.SUBJECT},
    name:{type: String},
    role:{type: String, enum: {
        values: ['student', 'teacher'],
        message: 'Role {VALUE} is not supported'
    }},
    location: {type: String, default:"Ha Noi"},
    date_of_birth: {type: Date, default: new Date().getTime()},
    email: { type: String, set: toLower },
    vnu_id: {type: String, index: { unique: true }, dropDups: true},
})
function toLower(v) {
    return v.toLowerCase();
}

module.exports = TestSchema
/** JUST A TEST SCHEMA */