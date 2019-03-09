'use strict';
module.exports = (sequelize, DataTypes) => {
  const Flair = sequelize.define('Flairs', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Flair.associate = function(models) {
    Flair.belongsTo(models.Posts, {
      foreignKey: "postId",
      onDelete: "CASCADE"
    });
  };
  return Flair;
};