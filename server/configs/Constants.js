const API_PATH = {
    REG_ACC: "/reg",
    LOGIN: "/auth/login",
    PROFILE_BY_ID: "/api/profile/:profileId",
    SET_PROFILE_BY_ID: "/api/profile/edit/:profileId",
    CREATE_CLASS: "/api/classes/create",
    ADD_MEMBER_CLASS: "/api/classes/:classId/members/add",
    MY_CLASS: "/api/classes/me",
    MY_CLASS_MEMBERS_INFORS: "/api/classes/:classId/members/infors",
    RECENT_CHAT: "/api/chat/recent",
    UPLOAD_DSSV : "/api/upload/dssv",
    UPLOAD_DSCV : "/api/upload/dscv",
    UPLOAD_DSMH: "/api/upload/dsmh",
    UPLOAD_SV_MH_SCORE : "/api/upload/svscore"
};

const AUTH_STATE = {
    UNAUTHORIZED: 0,
    AUTHORIZED: 1,
    AUTHORIZE_EXPRIED: 2,
    INVALID_AUTHORIZED: 3
}
const SECRET_KEY = "IT'S A SECRET";
const DB_CONFIGS = {
    HOST: "mongodb://localhost",
    PORT: "27017"
}
const DB_SCHEMA = {
    USER: "User",
    CLASS: "Class",
    LOGIN_INFO: "LoginInfo",
    CHAT: "Chat",
    MESSAGE: "Message",
}

const RES_FORM =(status, message) => {
    return {
        Status : status ? status : null,
        Message: message? message: null,
    }
}

module.exports = {
    API_PATH,
    SECRET_KEY,
    DB_CONFIGS,
    DB_SCHEMA,
    AUTH_STATE,
    RES_FORM
}