const API_PATH = {
    REG_ACC : "/api/reg",
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

module.exports = {API_PATH, SECRET_KEY, DB_CONFIGS, DB_SCHEMA, AUTH_STATE}