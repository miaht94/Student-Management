const Configs = require('./../../configs/Constants')
const { v4: uuidv4 } = require('uuid');
function createClass(req, res) {
    let senderVNUId = req.senderVNUId;

    global.DBConnection.User.findOne({vnu_id : senderVNUId},async (err, instance) => {
        if (!instance) {
            res.status(404);
            res.json({status: "Error", message: "Khong tim thay nguoi gui request"});
        } else if (instance.role !== "teacher") {
            res.status(404);
            res.json({status:"Error", message:"Permission Denied, role != teacher nhung lai tao class ???"})
        } else {
            try {
                
                let newClass = new global.DBConnection.Class({
                    class_id : uuidv4(),
                    class_name: req.body.class_name,
                    class_teacher: req.senderVNUId,
                })
                await newClass.save();
                res.status(200);
                res.json({status: "Success", message:"Tao lop thanh cong"});
            } catch (e) {
                res.status(400);
                res.json({status: "Error", message: "Xay ra loi trong viec tao lop"});
            }
        }
    })
}

function validateClassTeacher(req, res, next) {
    var classId = req.params.classId;
    global.DBConnection.Class.findOne({class_id: classId}, (err, instance) => {
        if (!instance) {
            res.status(404);
            res.json({status:"Error", message:"Class Not Found"});
        } else if (instance.class_teacher == req.senderVNUId) {
            req.classInstance = instance;
            next();
        } else {
            res.status(400);
            res.json({status:"Error", message:"You are not teacher in this class"});
        }
        
    })
}

async function addMembersToClass(req, res) {
    var membersVNUIds
    try {
        membersVNUIds = JSON.parse(req.body.members);
        console.log(membersVNUIds);
    } catch(e) {
        res.status(400);
        res.json({status: "Error", message:"Array Members Invalid"})
    }
    
    var curMembers = req.classInstance.class_members
    for (var memberVNUId of membersVNUIds) {
        let instance = await global.DBConnection.User.findOne({vnu_id: memberVNUId});
        if (instance) {
            curMembers.push(memberVNUId);
        }
    }
    req.classInstance.class_members = curMembers;
    await req.classInstance.save()
    res.status(200)
    res.json({status:"Success", message: JSON.stringify(req.classInstance.class_members)})
}

module.exports = {createClass, validateClassTeacher, addMembersToClass}