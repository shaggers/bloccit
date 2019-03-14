const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {
    signUp(req, res, next){
      res.render("users/sign_up");
    },
    create(req, res, next){
        //#1
             let newUser = {
               email: req.body.email,
               password: req.body.password,
               passwordConfirmation: req.body.passwordConfirmation
             };
        // #2
             userQueries.createUser(newUser, (err, user) => {
               if(err){
                 req.flash("error", err);
                 res.redirect("/users/sign_up");
               } else {
        
        // #3
                 passport.authenticate("local")(req, res, () => {
                   req.flash("notice", "You've successfully signed in!");
                   res.redirect("/");
                 })
               }
             });
    },
    signInForm(req, res, next){
        res.render("users/sign_in");
    },
    signIn(req, res, next){
        passport.authenticate('local', function(err, user, info) {
          console.log(user);
          if(err){
            req.flash("notice", "Sign in failed. Please try again.")
            return next(err);
          }
          if(!user){
            return res.redirect('/users/sign_in')
          } 
          req.login(user, function(err) {
            req.flash("notice", "You've successfully signed in!");
            if(err){return next(err);}
            return res.redirect("/")
          })
        })(req, res, next);
    },
    signOut(req, res, next){
        req.logout();
        req.flash("notice", "You've successfully signed out!");
        res.redirect("/");
    }
}