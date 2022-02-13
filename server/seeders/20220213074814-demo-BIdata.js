'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
      // Add seed commands here.
     
      await queryInterface.bulkInsert('BIs', [{
        BIName: 'TDA1 Finq (LOCAL)',
      },{
        BIName: 'TDA4 Finq (LOCAL / INTERNATIONAL)'
      },{
        BIName: 'TDA4 ARGO (INTERNATIONAL)'
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
      // Add commands to revert seed here.
    
      await queryInterface.bulkDelete('BIs', null, {});
     
  }
};
