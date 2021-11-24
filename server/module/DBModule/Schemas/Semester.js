const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Configs = require('../../../configs/Constants');
const ObjectId = Schema.Types.ObjectId;
const SemesterSchema = new Schema({
    semester_id: {type: String, required : true, unique: true, index: true},
    semester_name: {type: String, required: true},
})
module.exports = {SemesterSchema};