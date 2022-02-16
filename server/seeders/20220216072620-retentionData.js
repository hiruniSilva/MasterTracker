'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Retentions', [{
      retentionName: 'Premium  Support ',
    },{
      retentionName: 'OWN'
    }
    ], {});
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Retentions', null, {});
  }
};
