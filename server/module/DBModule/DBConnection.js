const mongoose = require('mongoose');
const Configs = require('../../configs/Constants');
const LoginInfoSchema = require('./Schemas/LoginInfoSchema');
const UserSchema = require('./Schemas/UserSchema');
const ClassSchema = require('./Schemas/ClassSchema');
const {ChatSchema, MessageSchema} = require('./Schemas/ChatSchema');
const TestSchema = require('./Schemas/TestSchema');
const SubjectSchema = require('./Schemas/SubjectSchema');
const { ScoreSchema, ScoresTableSchema } = require('./Schemas/ScoreSchema');
const { FeedSchema, PostSchema, CommentSchema } = require('./Schemas/FeedSchema');
const { SemesterSchema } = require('./Schemas/Semester');
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
        this.Subject = db.model(Configs.DB_SCHEMA.SUBJECT, SubjectSchema);
        this.Score = db.model(Configs.DB_SCHEMA.SCORE, ScoreSchema);
        this.ScoresTable = db.model(Configs.DB_SCHEMA.SCORES_TABLE, ScoresTableSchema);
        this.Post = db.model(Configs.DB_SCHEMA.POST, PostSchema);
        this.Feed = db.model(Configs.DB_SCHEMA.FEED, FeedSchema);
        this.Comment = db.model(Configs.DB_SCHEMA.COMMENT, CommentSchema);
        this.Semester = db.model(Configs.DB_SCHEMA.SEMESTER, SemesterSchema);
        this.Test = db.model(Configs.DB_SCHEMA.TEST_SCHEMA, TestSchema);
        global.DBConnection = this;
        this.initiated = true;

    }).bind(this),
    LoginInfo: undefined,
    User: undefined,
    Class : undefined,
    Chat: undefined,
    Message: undefined,
    Subject: undefined,
    ScoresTable: undefined,
    Score: undefined,
    Post: undefined,
    Feed: undefined,
    Comment: undefined,
    Semester: undefined,
    Test: undefined,
}

module.exports = DBConnection;