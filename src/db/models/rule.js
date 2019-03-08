'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rule = sequelize.define('Rules', {
    description: DataTypes.STRING
  }, {});
  Rule.associate = function(models) {
    Rule.belongsTo(models.Topics, {
      foreignKey: "topicId",
      onDelete: "CASCADE",
    });
  };
  return Rule;
};