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
  };
  return Comment;
};