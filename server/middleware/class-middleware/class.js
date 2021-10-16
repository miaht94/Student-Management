const Configs = require('./../../configs/Constants')
const {
    v4: uuidv4
} = require('uuid');

function fCreateClass(req, res) {
    let senderVNUId = req.senderVNUId;

    global.DBConnection.User.findOne({
        vnu_id: senderVNUId
    }, async (err, instance) => {
        if (!instance) {
            res.status(404);
            res.json({
                status: "Error",
                message: "Khong tim thay nguoi gui request"
            });
        } else if (instance.role !== "teacher") {
            res.status(404);
            res.json({
                status: "Error",
                message: "Permission Denied, role != teacher nhung lai tao class ???"
            })
        } else {
            try {

                let newClass = new global.DBConnection.Class({
                    class_id: uuidv4(),
                    class_name: req.body.class_name,
                    class_teacher: req.senderVNUId,
                })
                await newClass.save();
                res.status(200);
                res.json({
                    status: "Success",
                    message: "Tao lop thanh cong"
                });
            } catch (e) {
                res.status(400);
                res.json({
                    status: "Error",
                    message: "Xay ra loi trong viec tao lop"
                });
            }
        }
    })
}

/**Tiên quyết : có params classId, đã authenticate token và có instance user */
async function findClassByClassId(req, res, next) {
    let classId = req.params.classId;
    try {
        let classInstance = await global.DBConnection.Class.findOne({ class_id: classId});
        if (!classInstance) {
            res.status(404);
            res.json({
                status: "Error",
                message: "Class Not Found"
            });
        } else {
            req.classInstance = classInstance;
            next();
        }
    } catch(e) {
        res.status(404);
        res.json(Configs.RES_FORM("Error", "UnknownError"));
    }
}

/** Tiên quyết: có class Instance (find class rồi), đã authen token, có instance user, senderVNUId */
function validateClassTeacher(req, res, next) {
    var classInstance = req.classInstance;
    if (classInstance.class_teacher == req.senderVNUId) {
            next();
    } else {
        res.status(400);
        res.json(Configs.RES_FORM("Error", "You are not teacher in this class"));
    }
}

/** Tiên quyết: đã authentoken, có senderInstance, params có classId */
function validateClassMember(req, res, next) {
    var classInstance = req.classInstance;
    if (classInstance.class_members.includes(req.senderVNUId)) {
        next();
    } else {
        res.status(400);
        res.json(Configs.RES_FORM("Error", "You aren't a member in this class"));
    }
}

/** Tiên quyết: đã findClass( có class Instance ) */
async function fGetMemberBasicInfors(req, res) {
    let classInstance = req.classInstance;
    let classMembers = classInstance.class_members;
    let limit = req.query.limit;
    let members = await global.DBConnection.User.find({ vnu_id: {$in : classMembers}}).limit(parseInt(limit));
    res.status(200);
    res.json(Configs.RES_FORM("Sucess", members));
}

/** Tiên quyết: Body có danh sách vnu_id của các members cần add (Array)
 *  Có classInstance (đã có findClassById, body có classId)
 */
async function fAddMembersToClass(req, res) {
    var membersVNUIds
    try {
        membersVNUIds = JSON.parse(req.body.members);
    } catch (e) {
        res.status(400);
        res.json({
            Status: "Error",
            Message: "Array Members Invalid"
        })
    }

    var curMembers = req.classInstance.class_members
    for (var memberVNUId of membersVNUIds) {
        let instance = await global.DBConnection.User.findOne({
            vnu_id: memberVNUId
        });
        if (instance) {
            curMembers.push(memberVNUId);
        }
    }
    req.classInstance.class_members = curMembers;
    await req.classInstance.save()
    res.status(200)
    res.json({
        status: "Success",
        message: JSON.stringify(req.classInstance.class_members)
    })
}

async function fGetCurClasses(req, res) {
    var sender = req.senderInstance;
    if (sender.role == "teacher") {
        var classes = await global.DBConnection.Class.find({
            class_teacher: sender.vnu_id
        })
        res.status(200);
        res.json(classes);

    } else if (sender.role == "student") {
        var classes = await global.DBConnection.Class.find({
            class_members: sender.vnu_id
        })
        if (classes.length == 1) classes = classes[0];
        res.status(200);
        res.json(classes);
    }
}

module.exports = {
    fCreateClass,
    validateClassTeacher,
    fAddMembersToClass,
    fGetCurClasses,
    findClassByClassId,
    validateClassMember,
    fGetMemberBasicInfors
}