const Post = require("./models").Posts;
const Topic = require("./models").Topics;

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
        return Post.findById(id)
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