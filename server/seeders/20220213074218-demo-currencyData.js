'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
      // Add seed commands here.
      // Example:
      await queryInterface.bulkInsert('Currencies', [{
        CurrencyCode: 'LKR',
      }, {
        CurrencyCode: 'USD',
      },{
        CurrencyCode: 'INR'
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    
      // Add commands to revert seed here.
      await queryInterface.bulkDelete('Currencies', null, {});
     
  }
};
