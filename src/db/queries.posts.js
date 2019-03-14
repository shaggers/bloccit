const Post = require("./models").Posts;
const Topic = require("./models").Topics;
const Comment = require("./models").Comments;
const User = require("./models").Users;
const Vote = require("./models").Votes;

module.exports = {
    addPost(newPost, callback){
        return Post.create(newPost)
        .then((post) => {
          callback(null, post);
        })
        .catch((err) => {
          callback(err);
        })
    },
    getPost(id, callback){
      return Post.findById(id, {
        include: [
          {model: Comment, as: "comments", include: [
            {model: User }
          ]}, {model: Vote, as: "votes"}
        ]
      })
        .then((post) => {
          callback(null, post);
        })
        .catch((err) => {
          callback(err);
        })
    },
    deletePost(req, callback){

      return Post.findByPk(req.params.id)
      .then((post) => {
 
          post.destroy()
          .then((res) => {
            callback(null, post);
          });
      })
      .catch((err) => {
        callback(err);
      });

    },
    updatePost(id, updatedPost, callback){
        return Post.findById(id)
        .then((post) => {
          if(!post){
            return callback("Post not found");
          }
   
          post.update(updatedPost, {
            fields: Object.keys(updatedPost)
          })
          .then(() => {
            callback(null, post);
          })
          .catch((err) => {
            callback(err);
          });
        });
    }
}