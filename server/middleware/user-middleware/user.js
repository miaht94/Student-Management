const Configs = require('../../configs/Constants');
const userSchema = require('../../module/DBModule/Schemas/UserSchema');


function getProfileById(req, res) {
    if (req.params.profileId == "me") {
        var final = req.senderInstance;
        res.status(200);
        res.json(Configs.RES_FORM("Success",final))
        return;
    } 
    global.DBConnection.User.findOne({"vnu_id": req.params.profileId}).lean().exec((err, instance) => {
        if (err) {
            res.status(400)
            res.json(Configs.RES_FORM("Internal Error", err.toString()))
        }
        if (instance) {
            res.status(200);
            res.json(instance)
        } else {
            res.status(404);
            res.json(Configs.RES_FORM("NotFound", "User not found"))

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

async function editProfileById(req, res) {
    if (req.params.profileId == "me"){
        req.params.profileId = req.senderVNUId;
        try {
            // var final = await global.DBConnection.User.updateOne({_id :req.senderInstance._id},req.body, {new: true, runValidators: true,context: 'query'})
            await req.senderInstance.$set(req.body);
            var final = await req.senderInstance.save();
            res.status(200);
            res.json(Configs.RES_FORM("Success",final));
            return;
        } catch(e) {
            console.log("Co loi xay ra khi update profile");
            res.status(400);
            res.json(Configs.RES_FORM("Error",JSON.stringify(e)));
            return;
        }
    }
    global.DBConnection.User.findOneAndUpdate({"vnu_id": req.params.profileId}, req.body, {new: true, runValidators: true,
        context: 'query'}).exec((err, instance) => {
        if (err) {
            res.status(400);
            res.json(Configs.RES_FORM("Internal Error", err.toString()))
            return;
        }
        if (instance) {
            res.status(200);
            res.json(Configs.RES_FORM("Success", instance))
            return;
        } else {
            res.status(404);
            res.json(Configs.RES_FORM("NotFound", "User not found"))
            return;
        }
    })
}

module.exports = {getProfileById, validateEditProfileArgument, editProfileById};