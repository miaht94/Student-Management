const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Configs = require('./configs/Constants');
const DBConnection = require('./module/DBModule/DBConnection');
const csv=require('csvtojson/v2')
const csvFilePath= __dirname + "/public/data/users.csv";
const {register} = require('./middleware/auth-middleware/register');
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
// (async ()=> {
//     await DBConnection.Init();
//     // let msv = "abc"
//     // let res = await global.DBConnection.Chat.aggregate([
//     //     {
//     //         $match: {
//     //             vnu_id : msv
//     //         }
//     //     },
//     //     {
//     //         $lookup:
//     //             {
//     //                 from: global.DBConnection.User.collection.collectionName,
//     //                 localField: "from",
//     //                 foreignField: "_id",
//     //                 as: "fromInstance"
//     //             }
//     //     }
//     // ])
    
//     const jsonArray = await csv().fromFile(csvFilePath);
//     try {
//         // let res = await global.DBConnection.Test.insertMany(jsonArray, { ordered: false })
//         class fakeRes {
//             statusCode = null;
//             responseJson = null;
//             json = (obj) => {
//                 this.responseJson = obj;
//             };
//             status = (status) => {
//                 this.statusCode = status;
//             }
//         }
//         class fakeReq {
//             body = null
//             constructor(body) {
//                 this.body = body;
//             }
//         }
        
//         for (var i of jsonArray) {
//             i.role = "teacher";
//             var req = new fakeReq(i);
//             var res = new fakeRes();
//             await register(req, res);
//             console.log(res.statusCode);
//         }
//     } catch (e) {
//         console.log("Err:", e)
//     }
//     console.log(jsonArray)
// })()
class req {
    constructor() {

    }
    a;
    b;
}
class res {
    constructor() {

    }
    c;
    d;
}
function a(req, res, next) {
    req.a = 2;
    next();
}
function b(req, res) {
    res.c = req.a;
}
var nReq = new req();
var nRes = new res();
a(nReq, nRes, b.bind(null, nReq, nRes));
console.log(nRes.c)

// console.log(token);