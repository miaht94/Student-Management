const API_PATH = {
    REG_ACC: "/reg",
    LOGIN: "/auth/login",
    PROFILE_BY_ID: "/api/profile/:profileId",
    SET_PROFILE_BY_ID: "/api/profile/edit/:profileId",
    CREATE_CLASS: "/api/classes/create",
    ADD_MEMBER_CLASS: "/api/classes/:classId/members/add",
    MY_CLASS: "/api/classes/me",
    MY_CLASS_MEMBERS_INFORS: "/api/classes/:classId/members/infors",
    GET_CLASS_BY_ID : "/api/classes/:classId",
    RECENT_CHAT: "/api/chat/recent",
    MESSAGES_BY_VNU_ID: "/api/chat/:otherVNUId",
    UPLOAD_DSSV : "/api/upload/dssv",
    UPLOAD_DSCV : "/api/upload/dscv",
    UPLOAD_DSMH: "/api/upload/dsmh",
    UPLOAD_SV_MH_SCORE : "/api/upload/svscore",
    UPLOAD_FILE : "/api/upload/file",
    PUBLIC_DATA: "/public/data/:filename"
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
    console.log("New Response", {Status : status, Message: message})
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