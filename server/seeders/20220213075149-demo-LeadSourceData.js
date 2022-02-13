'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      // Add seed commands here.
      await queryInterface.bulkInsert('LeadSources', [{
        LeadSourceName: 'VA First',
      },{
        LeadSourceName: 'VA Second'
      },{
        LeadSourceName: 'Investing'
      },{
        LeadSourceName: 'Facebook'
      }], {});
  },

  async down (queryInterface, Sequelize) {
      // Add commands to revert seed here.
     
      await queryInterface.bulkDelete('LeadSources', null, {});
  }
};
