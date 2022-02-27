'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'VAFirstCalls',
      'BI'
    );

    await queryInterface.addColumn(
      'VAFirstCalls',
      'Team',
      {type: Sequelize.INTEGER,references: { model: 'Teams', key: 'id' }}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'VAFirstCalls',
      'BI',
      {type: Sequelize.INTEGER,references: { model: 'BIs', key: 'id' }}
    );

    await queryInterface.removeColumn(
      'VAFirstCalls',
      'Team',
    );
  }
};