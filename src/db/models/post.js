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
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Post.associate = function(models) {
    Post.belongsTo(models.Topics, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });
    Post.hasOne(models.Flairs, {
      foreignKey: "postId",
      as: "flairs"
    });
  };
  return Post;
};