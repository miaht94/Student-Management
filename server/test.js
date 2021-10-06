// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// var ObjectId = require('mongoose').Types.ObjectId; 
// (async () =>{
//     let db = await mongoose.connect('mongodb://localhost:27017');
//     function toLower(v) {
//         return v.toLowerCase();
//     }
      
//       const UserSchema = new Schema({
//         email: { type: String, set: toLower }
//       });
//       const userSch = new Schema({
//           email: {type: String},
//           refToAbc: {type: Schema.ObjectId, ref: "abc"}
//       })
//       const abc =db.model("abc",UserSchema);
//       const User = db.model('User', userSch);
//       const instance = await abc.findOne({id_: new ObjectId("6157492e98d7db03edc2dcdc")});
//       const user = new User({email: 'AVENUE@Q.COM',refToAbc: instance._id});
//       user.save(()=>{})
//       console.log(user._id); // 'avenue@q.com'
//   })()
const CONFIG = require("./configs/Constants");
var jwt = require('jsonwebtoken');
// let token = jwt.sign({
//   data: 'foobar'
// }, CONFIG.SECRET_KEY, { expiresIn: 60 });

var decoded = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vYmFyIiwiaWF0IjoxNjMzMjQ5ODkxLCJleHAiOjE2MzMyNDk5NTF9.dGjjQeFhm3Q8mH_SbiP87ajPRNmE8G6325PXP9tUjss", CONFIG.SECRET_KEY);
console.log(decoded);
// console.log(token);