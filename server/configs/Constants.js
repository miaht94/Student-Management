const API_PATH = {
    REG_ACC: "/reg",
    LOGIN: "/auth/login",
    PROFILE_BY_ID: "/api/profile/:profileId",
    SET_PROFILE_BY_ID: "/api/profile/edit/:profileId",
    CREATE_CLASS: "/api/classes/create",
    ADD_MEMBER_CLASS: "/api/classes/:classId/members/add",
    DELETE_MEMBER_CLASS: "/api/classes/:classId/members/delete",
    MY_CLASS: "/api/classes/me",
    MY_CLASS_MEMBERS_INFORS: "/api/classes/:classId/members/infors",
    GET_CLASS_BY_ID : "/api/classes/:classId",
    POST_TO_FEED : "/api/classes/:classId/feed/add",
    GET_POST_BY_ID: "/api/classes/:classId/feed/:postId",
    GET_ALL_POSTS: "/api/classes/:classId/feed/posts/get",
    COMMENT_TO_POST: "/api/classes/:classId/feed/:postId/comments/add",
    GET_COMMENT_POST: "/api/classes/:classId/feed/:postId/comments/get",
    RECENT_CHAT: "/api/chat/recent",
    MESSAGES_BY_VNU_ID: "/api/chat/:otherVNUId",
    ADD_SUBJECT: "/api/subjects/add",
    UPLOAD_DSSV : "/api/upload/dssv",
    UPLOAD_DSSV_CLASS : "/api/classes/:classId/members/import",
    UPLOAD_DSCV : "/api/upload/dscv",
    UPLOAD_DSMH: "/api/upload/dsmh",
    UPLOAD_SV_MH_SCORE : "/api/scores/import",
    UPLOAD_FILE : "/api/upload/file",
    ADD_SCORE_BY_VNU_ID: "/api/scores/add",
    GET_SCORES_BY_ID : "/api/scores/:userId",
    PUBLIC_DATA: "/public/data/:filename",
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
    SUBJECT: "Subject",
    SCORES_TABLE: "SvScoresTable", 
    SCORE: "SCORE",
    TEST_SCHEMA : "JustForTesting",
    FEED: "Feed",
    POST: "Post",
    COMMENT: "Comment"
}

const RES_FORM =(status, message) => {
    // console.log("New Response", {Status : status, Message: message})
    return {
        status : status ? status : null,
        message: message? message: null,
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