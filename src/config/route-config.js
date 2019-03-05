module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const aboutRoutes = require("../routes/about");
      app.use(staticRoutes);
      app.use(aboutRoutes);
    }
}