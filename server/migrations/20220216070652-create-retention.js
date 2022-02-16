'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Retentions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      retentionName: {
        type: Sequelize.STRING
      }
    });
    await queryInterface.removeColumn("MasterTracks", "Retention") ;

    await queryInterface.addColumn("MasterTracks", "Retention", {
			type: Sequelize.INTEGER,
      references: { model: 'Retentions', key: 'id' }
		});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Retentions');

    await queryInterface.removeColumn("MasterTracks", "Retention") ;
    
    await queryInterface.addColumn("MasterTracks", "Retention", {
			type: Sequelize.STRING,
		});
  }
};