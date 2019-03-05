module.exports = {
    index(req, res, next){
      res.send("About Us");
      next()
    }, function (req, res){
        res.render("static/index", {title: "About Us"});
    }
}