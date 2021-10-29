const Configs = require('./../../configs/Constants')
const {
    v4: uuidv4
} = require('uuid');
const csv=require('csvtojson/v2')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

/** FindClass and have classInstance in req */
async function getFeedInstanceFromClassInstance(req, res, next) {
    let feedInstance = await global.DBConnection.Feed.findOne({class_ref: req.classInstance._id});
    if (!feedInstance) {
        // Create a new Feed for class
        try {
            let newFeed = new global.DBConnection.Feed({
                class_ref: new ObjectId(req.classInstance._id),
                posts : []
            })
            await newFeed.save();
            req.classInstance.feed_ref = new ObjectId(newFeed._id);
            await req.classInstance.save();
            req.feedInstance = newFeed;
            next();
        } catch (e) {
            res.status(400);
            res.json(Configs.RES_FORM("Error", "Error when creating feed for class. Err:" + e.toString()))
            return;
        }
    } else {
        req.feedInstance = feedInstance;
        next();
    }
}

/** Tien quyet: validateToken, validateClassMember, findClassByClassId, getFeedInstanceFromClassInstance
 * req.senderInstance, feedInstance, req.body.content
*/
async function fPostToFeed(req, res) {
    let sender = req.senderInstance;
    let feedInstance = req.feedInstance;
    let postContent = req.body.content;
    let post = null;
    try {
        post = new global.DBConnection.Post({
            from: new ObjectId(sender._id),
            content : postContent,
            comment : []
        });
        await post.save();
    } catch(e) {
        res.status(400);
        res.json(Configs.RES_FORM("Error", "Error when creating new post to class feed. Err: " + e.toString()));
        return;
    }
    feedInstance.posts.push(post);
    await feedInstance.save();
    res.status(200);
    res.json(Configs.RES_FORM("Success", post));
    
}

/** Tien quyet: validateToken, validateClassMember, findClassByClassId, findFeed
 * req.senderInstance, req.body.content, req.feedInstance
*/
async function getPostInstance(req, res, next) {
    let sender = req.senderInstance;
    let postId = req.params.postId;
    let postInstance = await global.DBConnection.Post.findOne({_id : postId});
    if (!postInstance) {
        res.status(404);
        res.json(Configs.RES_FORM("Error", "Post not found"));
        return;
    }
    // await req.classInstance.populate('feed_ref');
    var foundInClass = false;
    for (var i of req.feedInstance.posts) {
        if (i.toHexString() == postInstance._id.toHexString()) {
            foundInClass = true;
            break;
        }
    }
    if (!foundInClass) {
        res.status(404);
        res.json(Configs.RES_FORM("Error", "Post found but not in your class"));
    }
    req.postInstance = postInstance;
    next();
}

/** Tien quyet: validateToken, validateClassMember, findClassByClassId, getPostInstance
 * req.senderInstance, req.body.content, req.postInstance
*/
async function fCommentToPost(req, res) {
    let sender = req.senderInstance;
    let post = req.postInstance;
    let newComment = null;
    try {
        newComment = new global.DBConnection.Comment({
            from : new ObjectId(sender._id),
            content: req.body.content,
        })
        await newComment.save();
    } catch (e) {
        res.status(400);
        res.json(Configs.RES_FORM("Error", "Error when creating comment. Err: " + e.toString()));
        return;
    }
    try {
        post.comments.push(newComment);
        await post.save();
        await post.populate('comments');
    } catch (e) {
        res.status(400);
        res.json(Configs.RES_FORM("Error", "Error when pushing comment to post. Err: " + e.toString()));
        return;
    }

    res.status(200);
    res.json(Configs.RES_FORM("Success", post));

}

/** validateToken, findClassByClassId, validateClassMember, getPostInstance 
 * req.senderInstance, classInstance, postInstance
 * params.classId, params.postId
 */
async function fGetCommentsInPost(req, res) {
    let post = req.postInstance;
    await post.populate("comments");
    res.status(200);
    res.json(Configs.RES_FORM("Success", post.comments));
}
module.exports = {fGetCommentsInPost, getFeedInstanceFromClassInstance, getPostInstance, fPostToFeed, fCommentToPost};