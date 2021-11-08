const { RES_FORM } = require("../../configs/Constants");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const csv=require('csvtojson/v2')

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

async function checkTargetAddScoreExist(req, res, next) {
    let studentVNUId = req.body.vnu_id;
    let subjectCode = req.body.subject_code;
    let score = req.body.score;

    var instanceUser = await global.DBConnection.User.findOne({vnu_id : studentVNUId});
    var instanceSubject = await global.DBConnection.Subject.findOne({subject_code: subjectCode});
    if (instanceUser && instanceSubject) {
        req.instanceUser = instanceUser;
        req.instanceSubject = instanceSubject;
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
                res.json(RES_FORM("Error", "Score for this subject is existed in user table score"))
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
                res.json(RES_FORM("Error", "Error when create new scores table for user"));
                return;
            }
            
        }
    } else {
        res.status(404);
        res.json(RES_FORM("Error", "Target VNU-ID or Subject not found"))
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
        });
        await instanceScore.save();
    } catch (e) {
        res.status(400);
        res.json(RES_FORM("Error", `Error when create instanceScore ${e}`));
        return;
    }
    try {
        instanceTable.scores.push(instanceScore);
        await instanceTable.save();
        res.status(200);
        res.json(RES_FORM("Success", `Added ${instanceSubject.subject_code} = ${score} to ${instanceUser.vnu_id} scoreboard`));
    } catch(e) {
        res.status(400);
        res.json(RES_FORM("Error", `Error when push instanceScore to scoreboard ${e}`));
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
    res.json(RES_FORM("Success", {added : success, failed: fail}));
}
module.exports = {fGetScoresClassByClassId, fAddScoreToScoresTable, checkTeacherOfVNUId, checkTargetAddScoreExist, fGetScoresByVNUId, fHandleUploadScore}