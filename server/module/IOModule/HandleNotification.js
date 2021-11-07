

function notifyNewPost(post, classId) {
    this.io.to(classId).emit("NewPost", post);
}

module.exports = {notifyNewPost};