const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Configs = require('../../../configs/Constants');
const ClassSchema = new Schema({
    class_id: {type: String, index : { unique: true }, dropDups : true, required: true},
    class_name: {type: String, required: true},
    class_teacher: {type: ObjectId, required: true, ref: Configs.DB_SCHEMA.USER},
    class_members: {type: [ObjectId], ref: Configs.DB_SCHEMA.USER, default: []},
})
module.exports = ClassSchema;