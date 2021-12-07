const Configs = require('./../../configs/Constants')
const {
    v4: uuidv4
} = require('uuid');
const csv=require('csvtojson/v2')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
async function fCreateClass(req, res) {
    let senderVNUId = req.senderVNUId;
    if (req.senderInstance.role !== "teacher") {
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
                class_teacher: new ObjectId(req.senderInstance._id),
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
}

/** Tiên quyết : có params classId, đã authenticate token và có instance user 
 * Gán classInstance vào req
*/
async function findClassByClassId(req, res, next) {
    let classId = req.params.classId;
    try {
        let classInstance = await global.DBConnection.Class.findOne({ class_id: classId});
        if (!classInstance) {
            res.status(404);
            res.json(Configs.RES_FORM("Error", "Class not found"));
        } else {
            req.classInstance = classInstance;
            next();
        }
    } catch(e) {
        res.status(404);
        res.json(Configs.RES_FORM("Error", "UnknownError"));
    }
}
/** Tiên quyết đã findClassByClassId */
async function fFindClassByClassId(req, res, next) {
    console.log(req.query)
    await req.classInstance.populate('class_teacher')
    if (!req.query.without_member)
        await req.classInstance.populate('class_members')
    if (req.query.teacher) {
        res.status(200)
        res.json(req.classInstance.class_teacher)
        return
    }
    
    res.status(200);
    res.json(req.classInstance);
}

/** Tiên quyết: có class Instance (find class rồi), đã authen token, có instance user, senderVNUId */
async function validateClassTeacher(req, res, next) {
    var classInstance = await req.classInstance.populate('class_teacher');
    if (classInstance.class_teacher.vnu_id == req.senderVNUId) {
            next();
    } else {
        res.status(400);
        res.json(Configs.RES_FORM("Error", "You are not teacher in this class"));
    }
}

/** Tiên quyết: đã authentoken, có senderInstance, có classInstance */
function validateClassMember(req, res, next) {
    var classInstance = req.classInstance;
    if (classInstance.class_members.includes(req.senderInstance._id) || classInstance.class_teacher.equals(req.senderInstance._id)) {
        next();
    } else {
        res.status(400);
        res.json(Configs.RES_FORM("Error", "You aren't a member in this class"));
    }
}

/** Tiên quyết: đã findClass( có class Instance ) */
async function fGetMemberBasicInfors(req, res) {
    let classInstance = await req.classInstance.populate('class_members');
    let limit = req.query.limit;
    if (limit > classInstance.class_members.length) limit = classInstance.class_members.length;
    let classMembers = classInstance.class_members.slice(0, limit);
    
    // let members = await global.DBConnection.User.find({ vnu_id: {$in : classMembers}}).limit(parseInt(limit));
    res.status(200);
    res.json(Configs.RES_FORM("Sucess", classMembers));
}

/** Tiên quyết: Body có danh sách emails của các members cần add (Array)
 *  Có classInstance (đã có findClassById, body có classId)
 */
async function fAddMembersToClass(req, res) {
    var membersVNUEmails;
    try {
        membersVNUEmails = JSON.parse(req.body.members);
    } catch (e) {
        res.status(400);
        res.json({
            Status: "Error",
            Message: "Array Members Invalid"
        })
    }

    var curMembers = req.classInstance.class_members
    var set = new Set();
    for (var i = 0; i < curMembers.length; i++) {
        set.add(curMembers[i].toHexString());
        console.log(curMembers[i].toHexString());
    }
    let instances = await global.DBConnection.User.find({
        email:{ $in : membersVNUEmails}
    });
        // if (instance) {
        //     curMembers.push(memberVNUId);
        // }
    var check = {};
    var added = [];
    for (i of membersVNUEmails) {
        check[i] = false;
    }
    for (instance of instances) {
        check[instance.email] = true;
        var oldLength = set.size;
        set.add(instance._id.toHexString());
        var newLength = set.size;
        if (oldLength == newLength) check[instance.email] = false;
    }
    req.classInstance.class_members = [];
    for (instance of set) {
        req.classInstance.class_members.push(new ObjectId(instance));
    }
    await req.classInstance.save();
    var notFound = [];
    for ([key, value] of Object.entries(check)) {
        if (!value)
            notFound.push({email: key, error: "Email không tồn tại trong hệ thống hoặc đã được thêm rồi"});
        else 
            added.push({email: key});
    };
    await req.classInstance.populate("class_members");
    res.status(200)
    res.json(Configs.RES_FORM("Success", {members: req.classInstance.class_members, registered : added, failed: notFound}))
}

async function fGetCurClasses(req, res) {
    var sender = req.senderInstance;
    if (sender.role == "teacher") {
        var classes = await global.DBConnection.Class.find({
            class_teacher: sender._id
        })
        res.status(200);
        res.json(Configs.RES_FORM("Success", classes));

    } else if (sender.role == "student") {
        var classes = await global.DBConnection.Class.find({
            class_members: sender._id
        })
        res.status(200);
        res.json(Configs.RES_FORM("Success", classes));
    }
}

/**Tiên quyết : findClassByClassId => validateClassTeacher */
async function fDeleteMemberInClass(req, res) {
    var membersVNUId;
    try {
        membersVNUId = JSON.parse(req.body.members);
    } catch (e) {
        res.status(400);
        res.json(Configs.RES_FORM("Error", "Array members invalid"))
    }
    await req.classInstance.populate("class_members");
    let curMembers = req.classInstance.class_members;
    let deleted = [];
    let deletedIndex = [];
    // let fail = [];
    for (var i of curMembers) {
        let index = membersVNUId.indexOf(i.vnu_id);
        if (index != -1) {
            membersVNUId.splice(index, 1);
            deletedIndex.push(true);
            deleted.push(i);
            continue;
        }
        deletedIndex.push(false);
        
    }
    let newMembers = [];
    for (var i in curMembers) {
        if (!deletedIndex[i]) newMembers.push(new ObjectId(curMembers[i]._id));
    }
    req.classInstance.class_members = newMembers;
    await req.classInstance.save();
    res.status(200)
    res.json(Configs.RES_FORM("Success", {deleted: deleted, failed: membersVNUId}))
}

async function handleUploadMembers(req, res, next) {
    const jsonArray = await csv().fromFile(req.fileUploadPath);
    members = [];
    for (var i of jsonArray) {
        members.push(i.email);
    }
    req.body.members = JSON.stringify(members);
    next();
}
module.exports = {
    fCreateClass,
    validateClassTeacher,
    fAddMembersToClass,
    fGetCurClasses,
    findClassByClassId,
    validateClassMember,
    fGetMemberBasicInfors,
    fFindClassByClassId,
    fDeleteMemberInClass,
    handleUploadMembers
}