const classRouter = require("express").Router();
const Configs = require("./../configs/Constants");
const {validateToken, validateLoginArgument, login, } = require("../middleware/auth-middleware/auth");
const {fFindClassByClassId, fCreateClass, validateClassTeacher, fAddMembersToClass, fGetCurClasses, handleUploadMembers, findClassByClassId, validateClassMember, fGetMemberBasicInfors, fDeleteMemberInClass} = require("../middleware/class-middleware/class");
const { handleUploadFile } = require("../middleware/upload-middleware/upload");
const { fLikePost, fGetCommentsInPost, getFeedInstanceFromClassInstance, fPostToFeed, getPostInstance, fCommentToPost, fGetPostById, fGetAllPost } = require("../middleware/class-middleware/post");
// classRouter.get('/auth/test', validateToken);
// authRouter.post('/auth/reg', register);
classRouter.get(Configs.API_PATH.GET_POST_BY_ID, validateToken, findClassByClassId, validateClassMember, getFeedInstanceFromClassInstance, getPostInstance, fGetPostById);
classRouter.get(Configs.API_PATH.GET_ALL_POSTS, validateToken, findClassByClassId, validateClassMember, getFeedInstanceFromClassInstance, fGetAllPost);
classRouter.post(Configs.API_PATH.CREATE_CLASS, validateToken, fCreateClass);
classRouter.post(Configs.API_PATH.ADD_MEMBER_CLASS, validateToken,findClassByClassId, validateClassTeacher, fAddMembersToClass);
classRouter.post(Configs.API_PATH.UPLOAD_DSSV_CLASS, validateToken, findClassByClassId, validateClassTeacher, handleUploadFile, handleUploadMembers, fAddMembersToClass);
classRouter.post(Configs.API_PATH.POST_TO_FEED, validateToken, findClassByClassId, validateClassMember, getFeedInstanceFromClassInstance, fPostToFeed);
classRouter.post(Configs.API_PATH.COMMENT_TO_POST, validateToken, findClassByClassId, validateClassMember, getFeedInstanceFromClassInstance, getPostInstance, fCommentToPost);
classRouter.post(Configs.API_PATH.LIKE_POST, validateToken, findClassByClassId, validateClassMember, getFeedInstanceFromClassInstance, getPostInstance, fLikePost);
classRouter.delete(Configs.API_PATH.DELETE_MEMBER_CLASS, validateToken, findClassByClassId, validateClassTeacher, fDeleteMemberInClass);
classRouter.get(Configs.API_PATH.MY_CLASS, validateToken, fGetCurClasses)
classRouter.get(Configs.API_PATH.MY_CLASS_MEMBERS_INFORS, validateToken, findClassByClassId, validateClassMember, fGetMemberBasicInfors)
classRouter.get(Configs.API_PATH.GET_CLASS_BY_ID, validateToken, findClassByClassId, fFindClassByClassId);
classRouter.get(Configs.API_PATH.GET_COMMENT_POST, validateToken, findClassByClassId, validateClassMember, findClassByClassId , getFeedInstanceFromClassInstance, getPostInstance, fGetCommentsInPost)
module.exports = classRouter