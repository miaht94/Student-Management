const { RES_FORM } = require("../../configs/Constants");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const csv=require('csvtojson/v2')
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');
const { dirname } = require("path");
var json2xls = require('json2xls');
const json2csvParser = new Parser();
/** validated token, body form have targetVNUId */
async function checkTeacherOfVNUId(req, res, next) {
    let senderInstance = req.senderInstance;
    let targetVNUId = req.params.userId;
    let targetInstance
    if (targetVNUId == "me" || targetVNUId == senderInstance.vnu_id) {
        targetInstance = senderInstance;
    } else 
        targetInstance = await global.DBConnection.User.findOne({vnu_id : targetVNUId});
    if (!targetInstance) {
        res.status(404);
        res.json(RES_FORM("Error", "Target user not found"));
        return;
    }
    if (targetVNUId != "me" || targetVNUId == senderInstance.vnu_id) {
        let classInstance = await global.DBConnection.Class.findOne({class_members : targetInstance._id, class_teacher: senderInstance._id});
        if (!classInstance) {
            res.status(404);
            res.json(RES_FORM("Error", "You are not teacher of this user"));
            return
        }
    }
    req.targetInstance = targetInstance;
    next();
}

/** Validated token (have senderInstance), checked sender is teacher of target */
async function fGetScoresByVNUId(req, res) {
    let scores = await global.DBConnection.ScoresTable.findOne({user_ref: req.targetInstance._id}).populate({
        path: "scores",
        populate: {
            path: "subject"
        }
    }).populate("user_ref");
    res.status(200);
    if (scores) {
        res.json(RES_FORM("Success", scores));
        return;
    }
    else {
        res.json(RES_FORM("Success", []));
        return
    }
}
/** Validated token (have senderInstance) */
async function fGetMyScore(req, res) {
    let scores = await global.DBConnection.ScoresTable.findOne({user_ref: req.targetInstance._id}).populate({
        path: "scores",
        populate: {
            path: "subject"
        }
    }).populate("user_ref");
    res.status(200);
    if (scores) {
        res.json(RES_FORM("Success", scores));
        return;
    }
    else {
        res.json(RES_FORM("Success", []));
        return
    }
}

async function checkTargetAddScoreExist(req, res, next) {
    let studentVNUId = req.body.vnu_id;
    let subjectCode = req.body.subject_code;
    let score = req.body.score;

    var instanceUser = await global.DBConnection.User.findOne({vnu_id : studentVNUId});
    var instanceSubject = await global.DBConnection.Subject.findOne({subject_code: subjectCode});
    var instanceSemester = await global.DBConnection.Semester.findOne({semester_id: req.body.semester_id})

    if (instanceUser && instanceSubject && instanceSemester) {
        req.instanceUser = instanceUser;
        req.instanceSubject = instanceSubject;
        req.instanceSemester = instanceSemester;
        var instanceTable = await global.DBConnection.ScoresTable.findOne({user_ref: instanceUser._id});
        if (instanceTable) {
            req.instanceTable = instanceTable;
            await instanceTable.populate({
                path : 'scores',
                populate : {
                    path : 'subject'
                }
            });
            var subjectScoreExisted = false
            for (var i of instanceTable.scores) {
                if (instanceSubject.subject_code == i.subject.subject_code) {
                    subjectScoreExisted = true
                    break;
                }
            }
            if (!subjectScoreExisted)
                next();
            else {
                res.status(400);
                res.json(RES_FORM("Error", "Điểm cho môn học này đã tồn tại trong bảng điểm"))
                return;
            }
        } else {
            try {
                instanceTable = new global.DBConnection.ScoresTable({
                    user_ref : new ObjectId(instanceUser._id),
                    scores : [],
                })
                await instanceTable.save()
                req.instanceTable = instanceTable;
                next();
            } catch (e) {
                res.status(400);
                res.json(RES_FORM("Error", "Lỗi khi khởi tạo bảng điểm lần đầu"));
                return;
            }
            
        }
    } else {
        res.status(404);
        if (!instanceUser){
            res.json(RES_FORM("Error", "Không tìm được VNU-ID" + req.body.vnu_id))
            return;
        }
        if (!instanceSemester) {
            res.json(RES_FORM("Error", "Không tìm thấy kỳ học " + req.body.semester_id))
            return
        }
        if (!instanceSubject) {
            res.json(RES_FORM("Error", "Không tìm thấy môn học" + req.body.subject_code))
        }
            

        return;
    }
}



/** Call checkTargetAddScoreExist first */
async function fAddScoreToScoresTable(req, res) {
    var instanceUser = req.instanceUser;
    var instanceSubject = req.instanceSubject;
    var instanceTable = req.instanceTable;
    var score = req.body.score;
    try {
        var instanceScore = new global.DBConnection.Score({
            score: score,
            subject: instanceSubject._id,
            semester_id: req.instanceSemester._id
        });
        await instanceScore.save();
    } catch (e) {
        res.status(400);
        res.json(RES_FORM("Error", `Lỗi khi khởi tạo dữ liệu điểm. Lỗi: ${e}`));
        return;
    }
    try {
        instanceTable.scores.push(instanceScore);
        await instanceTable.save();
        res.status(200);
        res.json(RES_FORM("Success", `Đã thêm môn học ${instanceSubject.subject_code} = ${score} vào bảng điểm ${instanceUser.vnu_id} `));
    } catch(e) {
        res.status(400);
        res.json(RES_FORM("Error", `Lỗi khi nhập dữ liệu điểm vào bảng điểm. Lỗi: ${e}`));
        return;
    }
    
}

/** Tiên quyết : validateToken, getClassById, validateClassTeacher */
async function fGetScoresClassByClassId(req, res) {
    var classInstance = req.classInstance;
    var senderInstance = req.senderInstance;
    var members = classInstance.class_members;
    let scores = await global.DBConnection.ScoresTable.find({user_ref: {$in : members}}).populate({
        path: "scores",
        populate: {
            path: "subject"
        }
    }).populate("user_ref");
    res.status(200);
    if (scores) {
        res.json(RES_FORM("Success", scores));
        return;
    }
    else {
        res.json(RES_FORM("Success", []));
        return
    }
}

async function fDownloadScoresClassByClassId(req, res) {
    var classInstance = req.classInstance;
    var senderInstance = req.senderInstance;
    var members = classInstance.class_members;
    var semesterId = req.params.semesterId;
    var semester = await global.DBConnection.Semester.findOne({semester_id: semesterId});
    if (!semester) {
        res.status(404);
        res.json(RES_FORM("Error", "Không tìm thấy học kỳ"))
        return
    }
    var _idSemester = semester._id.toHexString();
    var semester_name = semester.semester_name;

    let scores = await global.DBConnection.ScoresTable.find({user_ref: {$in : members}}).populate({
        path: "scores",
        populate: {
            path: "subject"
        }
    }).populate("user_ref");
    let result = [];
    let form = {
        "Mã sinh viên": null,
        "Họ và tên": null,
        "Môn học:" : null,
        "Mã môn học": null,
        "Số tín chỉ": null,
        "Điểm": null,
    }
    
    for (var i = 0; i < scores.length; i++) {
        let scoreboard = scores[i];
        let sv = scoreboard.user_ref;

        if (!scoreboard.scores) 
            continue;
        
        for (var j=0; j<scoreboard.scores.length; j++) {
            let score_subject = scoreboard.scores[j];

            if (score_subject.semester_id.toHexString() != _idSemester) {
                continue;
            }

            let subject_name = score_subject.subject.subject_name;
            let subject_code = score_subject.subject.subject_code;
            let credits_number = score_subject.subject.credits_number;
            let score = score_subject.score
            let res = {
                "Mã sinh viên": sv.vnu_id,
                "Họ và tên": sv.name,
                "Môn học:" : subject_name,
                "Mã môn học": subject_code,
                "Số tín chỉ": credits_number,
                "Điểm": score,
            }
            result.push(res);
        }
    }
    var xls = json2xls(result)
    console.log(__dirname)
    var file_path = path.resolve(__dirname,'..','..') + '/public/data/' + classInstance.class_name.toString().replace(" ", "") + '.xls';
    fs.writeFileSync(file_path, xls);
    res.status(200);
    if (scores) {
        // res.json(RES_FORM("Success", result));
        res.xls(classInstance.class_name.toString().replace(" ", "") + ".xls",result)
        return;
    }
    else {
        res.json(RES_FORM("Success", []));
        return
    }
}

async function fUpdateStatus(req, res) {
    var status = req.body.status;
    status = status.split(",")
    var instanceUser = await global.DBConnection.User.findOne({vnu_id : req.body.vnu_id});
    if (!instanceUser) {
        res.status(404);
        res.json(RES_FORM("Error", "Không tìm thấy sinh viên có VNU-ID: " + req.body.vnu_id))
        return;
    }
    var instanceTable = await global.DBConnection.ScoresTable.findOne({user_ref: instanceUser._id});
    if (!instanceTable) {
        try {
            instanceTable = new global.DBConnection.ScoresTable({
                user_ref : new ObjectId(instanceUser._id),
                scores : [],
            })
            await instanceTable.save()
        } catch (e) {
            res.status(400);
            res.json(RES_FORM("Error", "Lỗi khi khởi tạo bảng điểm lần đầu"));
            return;
        }
    }
    instanceTable.status = status;
    await instanceTable.save()
    res.status(200);
    res.json(RES_FORM("Success", "Thêm status thành công"))
}

/** Handle upload file first */
async function fHandleUploadStatus(req, res) {
    let success = [];
    let fail = [];
    const jsonArray = await csv().fromFile(req.fileUploadPath);
        // let res = await global.DBConnection.Test.insertMany(jsonArray, { ordered: false })
    class fakeRes {
        statusCode = null;
        responseJson = null;
        json = (obj) => {
            this.responseJson = obj;
        };
        status = (status) => {
            this.statusCode = status;
        }
    }
    class fakeReq {
        body = null
        constructor(body) {
            this.body = body;
        }
    }
    
    for (var i of jsonArray) {
        var fakeReqInstance = new fakeReq(i);
        var fakeResInstance = new fakeRes();
        await fUpdateStatus(fakeReqInstance, fakeResInstance, () => {return});
        if (fakeResInstance.statusCode != 200) {
            if (fakeResInstance.responseJson && fakeResInstance.responseJson.message)
                i.error = fakeResInstance.responseJson.message;
            fail.push(i);
        } else {
            i.response = fakeResInstance.responseJson.message;
            success.push(i);
        }
        
    }
    res.status(200);
    res.json(RES_FORM("Success", {registered : success, failed: fail}));
}

/** Handle upload file first */
async function fHandleUploadScore(req, res) {
    let success = [];
    let fail = [];
    const jsonArray = await csv().fromFile(req.fileUploadPath);
        // let res = await global.DBConnection.Test.insertMany(jsonArray, { ordered: false })
    class fakeRes {
        statusCode = null;
        responseJson = null;
        json = (obj) => {
            this.responseJson = obj;
        };
        status = (status) => {
            this.statusCode = status;
        }
    }
    class fakeReq {
        body = null
        constructor(body) {
            this.body = body;
        }
    }
    
    for (var i of jsonArray) {
        var fakeReqInstance = new fakeReq(i);
        var fakeResInstance = new fakeRes();
        await checkTargetAddScoreExist(fakeReqInstance, fakeResInstance, () => {return});
        if (!fakeResInstance.statusCode) {
            await fAddScoreToScoresTable(fakeReqInstance, fakeResInstance);
        }
        if (fakeResInstance.statusCode != 200) {
            if (fakeResInstance.responseJson && fakeResInstance.responseJson.message)
                i.error = fakeResInstance.responseJson.message;
            fail.push(i);
        } else {
            i.response = fakeResInstance.responseJson.message;
            success.push(i);
        }
        
    }
    res.status(200);
    res.json(RES_FORM("Success", {registered : success, failed: fail}));
}
module.exports = {fDownloadScoresClassByClassId, fHandleUploadStatus, fGetScoresClassByClassId, fAddScoreToScoresTable, checkTeacherOfVNUId, checkTargetAddScoreExist, fGetScoresByVNUId, fHandleUploadScore, fUpdateStatus}