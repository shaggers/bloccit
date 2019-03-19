const Comment = require("./models").Comments;
const Post = require("./models").Posts;
const User = require("./models").Users;
const Favorite = require("./models").Favorites;
const Authorizer = require("../policies/favorite");

module.exports = {

// #2
  createFavorite(req, callback){
    return Favorite.create({
      postId: req.params.postId,
      userId: req.user.id
    })
    .then((favorite) => {
      callback(null, favorite);
    })
    .catch((err) => {
      callback(err);
    });
  },

// #3
  deleteFavorite(req, callback){
    const id = req.params.id;

    return Favorite.findById(id)
    .then((favorite) => {

      if(!favorite){
        return callback("Favorite not found");
      }

// #4
      const authorized = new Authorizer(req.user, favorite).destroy();

      if(authorized){
        Favorite.destroy({ where: { id }})
        .then((deletedRecordsCount) => {
          callback(null, deletedRecordsCount);
        })
        .catch((err) => {
          callback(err);
        });
      } else {
        req.flash("notice", "You are not authorized to do that.")
        callback(401);
      }
    })
    .catch((err) => {
      callback(err);
    });
  }
}