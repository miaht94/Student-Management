function updateInstance(instance, update) {
    for (const [key, value] of Object.entries(instance)) {
        instance[key] = update[key] ? update[key] : value;
    }
    return instance;
}

async function checkVNUIdExist(vnu_id) {
    var instance = await global.DBConnection.User.findOne({vnu_id : vnu_id})
    if (instance) return true;
    return false;
}
module.exports = updateInstance;