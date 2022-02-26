'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BranchTeams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      branch: {
        type: Sequelize.INTEGER,
        references: {model: 'Branches', key: 'id'},
        onDelete: 'CASCADE',
      },
      teams: {
        type: Sequelize.INTEGER,
        references: {model: 'Teams', key: 'id'},
        onDelete: 'CASCADE',
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BranchTeams');
  }
};