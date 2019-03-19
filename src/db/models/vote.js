"use strict";
module.exports = (sequelize, DataTypes) => {
  var Vote = sequelize.define("Votes", {
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[-1, 1]]
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    indexes: [
        {
            unique: true,
            fields: ['postId', 'userId']
        }
    ]
  });
  Vote.associate = function(models) {
    // associations can be defined here
    Vote.belongsTo(models.Posts, {
      foreignKey: "postId",
      onDelete: "CASCADE"
    });

    Vote.belongsTo(models.Users, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };
  return Vote;
};