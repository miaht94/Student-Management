const { RES_FORM } = require("../../configs/Constants");

async function fAddSubject(req, res) {
    let subjectName = req.body.subject_name;
    let subjectCode = req.body.subject_code;
    let credits_number = req.body.credits_number;
    try {
        let newSubject = global.DBConnection.Subject({
            subject_name: subjectName,
            subject_code: subjectCode,
            credits_number: credits_number,
        })
        await newSubject.save();
        res.status(200);
        res.json(RES_FORM("Success", `Added ${subjectCode} -> ${subjectName} -> ${credits_number}`));
    } catch(e) {
        if (e.code == 11000) {
            res.status(400);
            res.json(RES_FORM("Error", "Subject code or subject name existed"));
        } else {
            res.status(400);
            res.json(RES_FORM("Error", "Unknown error. Maybe required field not found. Err message: " + e.toString()));
        }
        
    }
}
module.exports = {fAddSubject};