'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Branches',
      'BI'
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Branches',
      'BI',
      {type: Sequelize.INTEGER,references: { model: 'BIs', key: 'id' }}
    );
  }
};