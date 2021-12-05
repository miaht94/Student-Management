const { RES_FORM } = require("../../configs/Constants");
const csv=require('csvtojson/v2')
async function fAddSemester(req, res) {
    let semesterName = req.body.semester_name;
    let semesterCode = req.body.semester_id;
    try {
        let newSubject = global.DBConnection.Semester({
            semester_name: semesterName,
            semester_id: semesterCode,
        })
        await newSubject.save();
        res.status(200);
        res.json(RES_FORM("Success", `Đã thêm kỳ học ${semesterCode}: ${semesterName}`));
    } catch(e) {
        if (e.code == 11000) {
            res.status(400);
            res.json(RES_FORM("Error", "Mã kỳ học đã tồn tại"));
        } else {
            res.status(400);
            res.json(RES_FORM("Error", "Lỗi không xác định. Lỗi: " + e.toString()));
        }
        
    }
}
async function fGetSemester(req, res) {
    let semester_id = req.params.semesterId
    let semesterInstance = await global.DBConnection.Semester.findOne({semester_id: semester_id})
    if (semesterInstance) {
        res.status(200);
        res.json(RES_FORM("Success", semesterInstance));
    } else {
        res.status(404);
        res.json(RES_FORM("Error", "Mã kỳ học không tồn tại"))
    }

}

async function fGetAllSemester(req, res) {
    let semester_id = req.params.semesterId
    let semesterInstance = await global.DBConnection.Semester.find({})
    if (semesterInstance) {
        res.status(200);
        res.json(RES_FORM("Success", semesterInstance));
    } else {
        res.status(404);
        res.json(RES_FORM("Error", "Mã kỳ học không tồn tại"))
    }

}

/** Handle upload file first */
async function fHandleUploadSemester(req, res) {
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
        await fAddSemester(fakeReqInstance, fakeResInstance);
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

module.exports = {fAddSemester, fGetSemester, fHandleUploadSemester, fGetAllSemester}
