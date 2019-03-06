'use strict';

let rules = [];

for(let i = 1 ; i <= 15 ; i++){
  rules.push({
    description: "this is a fake rule",
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [queryInterface.createTable('Rules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      topicId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Topic",
          key: "id",
          as: "topicId",
        }
      }
    }),
    queryInterface.bulkInsert("Rules", rules, {})];
  },
  down: (queryInterface, Sequelize) => {
    return [queryInterface.dropTable('Rules'),
    queryInterface.bulkDelete("Rules", null, {})];
  }
};