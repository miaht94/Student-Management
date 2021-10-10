const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const ClassSchema = new Schema({
    class_id: {type: String, index : { unique: true }, dropDups : true, required: true},
    class_name: {type: String, required: true},
    class_teacher: {type: String, required: true},
    class_members: {type: [String], default: [], set: toSet},
})
function toSet(a) {
    return [... new Set(a)]
}
module.exports = ClassSchema;