"use strict";
module.exports = (sequelize, DataTypes) => {
  var Favorite = sequelize.define("Favorites", {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Favorite.associate = function(models) {
    // associations can be defined here
    Favorite.belongsTo(models.Posts, {
      foreignKey: "postId",
      onDelete: "CASCADE"
    });

    Favorite.belongsTo(models.Users, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Favorite.addScope("allFor", (userId) => {

      return {
        include: [{
          model: models.Posts
        }],
        where: { userId: userId},
        order: [["createdAt", "DESC"]]
      }
    });
  };
  return Favorite;
};