// #1
const User = require("./models").Users;
const Post = require("./models").Posts;
const Comment = require("./models").Comments;
const Favorite = require("./models").Favorites;
const bcrypt = require("bcryptjs");

module.exports = {
// #2
  createUser(newUser, callback){

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getUser(id, callback){
       let result = {};
       User.findById(id)
       .then((user) => {
         if(!user) {
           callback(404);
         } else {
           result["user"] = user;
           Post.scope({method: ["lastFiveFor", id]}).all()
           .then((posts) => {
             result["posts"] = posts;
             Comment.scope({method: ["lastFiveFor", id]}).all()
             .then((comments) => {
               result["comments"] = comments;
               Favorite.scope({method: ["allFor", id]}).all()
               .then((favorites) => {
                 result["favorites"] = favorites;
                 callback(null, result);
               })
               .catch((err) => {
                console.log(err);
                callback(err);
               })
              })
            })
          }
        })
  }

}