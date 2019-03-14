'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "must be a valid email" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "member"
    }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Posts, {
      foreignKey: "userId",
      as: "posts"
    });

    User.hasMany(models.Comments, {
      foreignKey: "userId",
      as: "comments"
    }); 
  };
  User.prototype.isAdmin = function() {
    return this.role === "admin";
  };
  return User;
};