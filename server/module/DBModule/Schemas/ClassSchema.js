const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const ClassSchema = new Schema({
    class_id: {type: String, index : { unique: true }, dropDups : true},
    class_name: {type: String},
    class_members: {type: [ObjectId], default: []},
    created_date: {type: Date, default: new Date(1552261496289)}
})
module.exports = ClassSchema;