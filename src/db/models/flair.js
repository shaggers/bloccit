'use strict';
module.exports = (sequelize, DataTypes) => {
  const Flair = sequelize.define('Flairs', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Flair.associate = function(models) {
    
  };
  return Flair;
};