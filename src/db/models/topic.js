'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topics = sequelize.define('Topics', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    topicId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "Topic",
        key: "id",
        as: "topicId",
      }
    }
  }, {});
  Topics.associate = function(models) {
    Topics.hasMany(models.Banner, {
      foreignKey: "topicId",
      as: "banners",
    });
    Topics.hasMany(models.Rule, {
      foreignKey: "topicId",
      as: "rules",
    });
  };
  return Topics;
};