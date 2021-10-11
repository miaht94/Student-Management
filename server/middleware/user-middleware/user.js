const userSchema = require('../../module/DBModule/Schemas/UserSchema');


function getProfileById(req, res) {
    if (req.params.profileId == "me")
        req.params.profileId = req.senderVNUId;
    global.DBConnection.User.findOne({"vnu_id": req.params.profileId}).lean().exec((err, instance) => {
        if (err) {
            res.status(400)
            res.json({"Status" : "Internal Error", "message" : err.toString()})
        }
        if (instance) {
            res.status(200);
            res.json(instance)
        } else {
            res.status(404);
            res.json({"Status": "NotFound", "message": "User not found"})

        }
    })
}

function validateEditProfileArgument(req, res, next) {
    // let user = new global.DBConnection.User(req.body);
    // let err = user.validateSync();
     //ignore role when edit profile
    // delete err.errors['role'];
    // res.json(JSON.stringify(err.errors));
    next();
}

function editProfileById(req, res) {
    if (req.params.profileId == "me")
        req.params.profileId = req.senderVNUId;
    global.DBConnection.User.findOneAndUpdate({"vnu_id": req.params.profileId}, req.body, {new: true, runValidators: true,
        context: 'query'}).exec((err, instance) => {
        if (err) {
            res.status(400)
            res.json({"Status" : "Internal Error", "message" : err.toString()})
            return;
        }
        if (instance) {
            res.status(200);
            res.json({"Status": "Success","message": instance})
            return;
        } else {
            res.status(404);
            res.json({"Status": "NotFound", "message": "User not found"})
            return;
        }
    })
}

module.exports = {getProfileById, validateEditProfileArgument, editProfileById};