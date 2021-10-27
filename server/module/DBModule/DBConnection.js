const mongoose = require('mongoose');
const Configs = require('../../configs/Constants');
const LoginInfoSchema = require('./Schemas/LoginInfoSchema');
const UserSchema = require('./Schemas/UserSchema');
const ClassSchema = require('./Schemas/ClassSchema');
const {ChatSchema, MessageSchema} = require('./Schemas/ChatSchema');
let DBConnection = {
    initiated : false,
    Init : (async () => {
        if (this.initiated) return;
        const db = await mongoose.connect(`${Configs.DB_CONFIGS.HOST}:${Configs.DB_CONFIGS.PORT}`);
        this.LoginInfo = db.model(Configs.DB_SCHEMA.LOGIN_INFO, LoginInfoSchema);
        this.User = db.model(Configs.DB_SCHEMA.USER, UserSchema);
        this.Class = db.model(Configs.DB_SCHEMA.CLASS, ClassSchema);
        this.Chat = db.model(Configs.DB_SCHEMA.CHAT, ChatSchema);
        this.Message = db.model(Configs.DB_SCHEMA.MESSAGE, MessageSchema);
        global.DBConnection = this;
        this.initiated = true;

    }).bind(this),
    LoginInfo: undefined,
    User: undefined,
    Class : undefined,
    Chat: undefined,
    Message: undefined,
}

module.exports = DBConnection;