'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comments', {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Comment.associate = function(models) {
    Comment.belongsTo(models.Posts, {
      foreignKey: "postId",
      onDelete: "CASCADE"
    });

    Comment.belongsTo(models.Users, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Comment.addScope("lastFiveFor", (userId) => {
      return {
        include: [{
          model: models.Posts
        }],
        where: { userId: userId},
        limit: 5,
        order: [["createdAt", "DESC"]]
      }
    });
  };

  return Comment;
};