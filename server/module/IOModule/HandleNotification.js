

function notifyNewPost(post, classId) {
    this.io.to(classId).emit("NewPost", post);
}

function notifyNewComment(newComment, postId, classId) {
    this.io.to(classId).emit("NewComment", {new_comment: newComment, postId: postId});
}

function notifyUpdatePost(newPost, classId) {
    
    this.io.to(classId).emit("UpdatePost", newPost);
}

module.exports = {notifyNewPost, notifyNewComment, notifyUpdatePost};