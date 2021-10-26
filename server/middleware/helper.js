function updateInstance(instance, update) {
    for (const [key, value] of Object.entries(instance)) {
        instance[key] = update[key] ? update[key] : value;
    }
    return instance;
}
module.exports = updateInstance;