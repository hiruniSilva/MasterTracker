'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Configs', {
      key: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Configs');
  }
};