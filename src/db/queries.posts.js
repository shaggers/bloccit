const Post = require("./models").Posts;
const Topic = require("./models").Topics;
const Comment = require("./models").Comments;
const User = require("./models").Users;
const Vote = require("./models").Votes;
const Favorite = require("./models").Favorites;

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
      return Post.findByPk(id, {
        include: [
          {model: Comment, as: "comments", include: [
            {model: User }
          ]}, {model: Vote, as: "votes"},
              {model: Favorite, as: "favorites"}
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
        return Post.findByPk(id)
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