const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Configs = require('./configs/Constants');
const DBConnection = require('./module/DBModule/DBConnection');
// var ObjectId = require('mongoose').Types.ObjectId; 
// (async () =>{
    
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
const { ObjectId } = require('mongodb');
// let token = jwt.sign({
//   data: 'foobar'
// }, CONFIG.SECRET_KEY, { expiresIn: 60 });

// var decoded = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9vYmFyIiwiaWF0IjoxNjMzMjQ5ODkxLCJleHAiOjE2MzMyNDk5NTF9.dGjjQeFhm3Q8mH_SbiP87ajPRNmE8G6325PXP9tUjss", CONFIG.SECRET_KEY);
// console.log(decoded);
(async ()=> {
    await DBConnection.Init();
    let msv = "abc"
    let res = await global.DBConnection.Chat.aggregate([
        {
            $match: {
                vnu_id : msv
            }
        },
        {
            $lookup:
                {
                    from: global.DBConnection.User.collection.collectionName,
                    localField: "from",
                    foreignField: "_id",
                    as: "fromInstance"
                }
        }
    ])
    console.log(res);
})()

// console.log(token);