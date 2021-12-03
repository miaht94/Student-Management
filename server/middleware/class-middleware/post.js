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
            created_date: req.body.created_date ? req.body.created_date : new Date().getTime(),
            comment : []
        });
        await post.save();
    } catch(e) {
        res.status(400);
        res.json(Configs.RES_FORM("Error", "Error when creating new post to class feed. Err: " + e.toString()));
        return;
    }
    try {
        feedInstance.posts.push(new ObjectId(post._id));
        await feedInstance.save();
    } catch (e) {
        res.status(400);
        res.json(Configs.RES_FORM("Error", "Error when push post to feed instance. Err : " + e.toString()))
    }
    try {
        await post.populate('from');
        global.IOConnection.notifyNewPost(post, req.classInstance.class_id);
    } catch (e) {
        console.log("Socket.io emit NewPost event fail")
    }
    
    res.status(200);
    res.json(Configs.RES_FORM("Success", post));
    
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
        await newComment.populate('from');
    } catch (e) {
        res.status(400);
        res.json(Configs.RES_FORM("Error", "Error when creating comment. Err: " + e.toString()));
        return;
    }
    try {
        post.comments.push(newComment);
        await post.save();
        await post.populate('comments');
        global.IOConnection.notifyNewComment(newComment, req.params.postId, req.classInstance.class_id);
    } catch (e) {
        res.status(400);
        res.json(Configs.RES_FORM("Error", "Error when pushing comment to post. Err: " + e.toString()));
        return;
    }

    res.status(200);
    res.json(Configs.RES_FORM("Success", post));

}
async function fLikePost(req, res) {
    let sender = req.senderInstance;
    let post = req.postInstance;
    try {
        // post.comments.push(newComment);
        // await post.save();
        // await post.populate('comments');
        // global.IOConnection.notifyNewComment(newComment, req.params.postId, req.classInstance.class_id);
        var set = new Set();
        let temp = post.liked;
        let liked = false;
        new_liked = [];
        for (i of temp) {
            if (i.toHexString() == sender._id.toHexString()) {
                liked = true;
                continue;
            }
            set.add(i.toHexString());
        }
        if (!liked) set.add(sender._id)
        for (i of set) {
            new_liked.push(ObjectId(i));
        }
        post.liked = new_liked;
        await post.save();
        await post.populate({
            path: 'comments',
            populate: {
                path: 'from'
            }
        });
        await post.populate('liked');
        await post.populate('from');
        global.IOConnection.notifyUpdatePost(post, req.classInstance.class_id);
    } catch (e) {
        res.status(400);
        res.json(Configs.RES_FORM("Error", "Lỗi khi like post. Err: " + e.toString()));
        return;
    }

    res.status(200);
    res.json(Configs.RES_FORM("Success", ""));

}

/** validateToken, findClassByClassId, validateClassMember, getPostInstance 
 * req.senderInstance, classInstance, postInstance
 * params.classId, params.postId
 */
async function fGetCommentsInPost(req, res) {
    let post = req.postInstance;
    await post.populate({
        path: "comments",
        populate : {
            path: "from"
        }
    });
    res.status(200);
    res.json(Configs.RES_FORM("Success", post.comments));
}

/** validateToken, findClassByClassId, validateClassMember, getFeedInstanceFromClassInstance, getPostInstance
 *  req.params.classId, req.params.postId, req.postInstance, req.classInstance, req.senderInstance
 */
async function fGetPostById(req, res) {
    await req.postInstance.populate("comments");
    await req.postInstance.populate("from")
    res.status(200);
    res.json(Configs.RES_FORM("Success", req.postInstance))
}

/** validateToken, findClassByClassId, validateClassMember, getFeedInstanceFromClassInstance
 * req.params.classId, 
 * req.classInstance, req.senderInstance
 */
async function fGetAllPost(req, res) {
    
    // await req.feedInstance.populate({
    //     path: "posts",
    //     populate: {
    //         path: "comments",
    //         populate : {
    //             path : "from"
    //         }
    //     }
    // });
    let feed = await req.feedInstance.populate({
        path: "posts",
        populate: {
            path: "from",
        }
    })
    feed = feed.posts
    for (i of feed) {
        await i.populate({
            path :'comments',
            populate: {
                path: 'from',
            }
        })
        await i.populate({
            path: 'liked'
        })
    }
    res.status(200);
    res.json(Configs.RES_FORM("Sucess", req.feedInstance.posts))
}
module.exports = {fLikePost, fGetAllPost, fGetPostById, fGetCommentsInPost, getFeedInstanceFromClassInstance, getPostInstance, fPostToFeed, fCommentToPost};