'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.addColumn(
    'MasterTracks',
    'Database',
    {type: Sequelize.INTEGER,references: { model: 'Databases', key: 'id' }}
  );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'MasterTracks',
      'Database',
    );
  }
};
