const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function toLower(v) {
    return v.toLowerCase();
}

const UserSchema = new Schema({
    name:{type: String},
    role:{type: String, enum: {
        values: ['student', 'teacher', 'admin'],
        message: 'Role {VALUE} is not supported'
    }, require: true},
    gender:{type: String, enum: {
        values: ['male', 'female'],
        message: 'Gender {VALUE} is not supported'
    }, require: true},
    phone_number: {type: String, required: false, default: "Chưa có số điện thoại" },
    parent_number: {type:String, required: false, default: "Chưa có số điện thoại phụ huynh"},
    location: {type: String, default:"Ha Noi"},
    date_of_birth: {type: Number, default: new Date().getTime()},
    email: { type: String, set: toLower },
    vnu_id: {type: String, index: { unique: true }, dropDups: true},
  });
  module.exports = UserSchema