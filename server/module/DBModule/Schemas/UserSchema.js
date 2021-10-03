const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function toLower(v) {
    return v.toLowerCase();
}

const UserSchema = new Schema({
    name:{type: String},
    role:{type: String},
    date_of_birth: {type: Date},
    email: { type: String, set: toLower },
    vnu_id: {type: String, index: { unique: true }, dropDups: true},
  });

  module.exports = UserSchema