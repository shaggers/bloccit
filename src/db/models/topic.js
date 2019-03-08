'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define("Topics", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Topic.associate = function(models) {
    Topic.hasMany(models.Banner, {
      foreignKey: "topicId",
      as: "banner",
    }),
    Topic.hasMany(models.Posts, {
      foreignKey: "topicId",
      as: "posts"
    });
    Topic.hasMany(models.Rules, {
      foreignKey: "topicId",
      as: "rules",
    });
  };
  return Topic;
};