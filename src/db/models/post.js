'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Posts', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flair: {
      type: DataTypes.STRING,
      allowNull: true
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.Topics, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });
    Post.belongsTo(models.Users, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    Post.hasMany(models.Comments, {
      foreignKey: "postId",
      as: "comments"
    });
  };
  return Post;
};