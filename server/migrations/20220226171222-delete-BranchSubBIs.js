'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
    await queryInterface.dropTable('BranchSubBIs');
	},

	async down(queryInterface, Sequelize) {
    await queryInterface.createTable('BranchSubBIs', {
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
      subBI: {
        type: Sequelize.INTEGER,
        references: {model: 'BIs', key: 'id'},
        onDelete: 'CASCADE',
      }
    });	},
};
