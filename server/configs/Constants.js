const API_PATH = {
    REG_ACC : "/reg",
    LOGIN: "/auth/login",
    PROFILE_BY_ID: "/api/profile/:profileId",
    SET_PROFILE_BY_ID: "/api/profile/edit/:profileId",
    CREATE_CLASS: "/api/classes/create",
    ADD_MEMBER_CLASS: "/api/classes/:classId/members/add",
    MY_CLASS: "/api/classes/me"
};

const AUTH_STATE = {
    UNAUTHORIZED : 0,
    AUTHORIZED : 1,
    AUTHORIZE_EXPRIED: 2,
    INVALID_AUTHORIZED: 3
}
const SECRET_KEY = "IT'S A SECRET";
const DB_CONFIGS = {
    HOST: "mongodb://localhost",
    PORT: "27017"
}
const DB_SCHEMA = {
    USER : "User",
    CLASS: "Class",
    LOGIN_INFO: "LoginInfo"
}

const RES_FORM = {
    Status: null,
    Message: null,
}

module.exports = {API_PATH, SECRET_KEY, DB_CONFIGS, DB_SCHEMA, AUTH_STATE, RES_FORM}