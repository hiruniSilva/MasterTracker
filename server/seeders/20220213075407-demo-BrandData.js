'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      // Add seed commands here.
     
      await queryInterface.bulkInsert('Brands', [{
        BrandName: 'Test1',
      },{
        BrandName: 'Test2'
      }], {});
  },

  async down (queryInterface, Sequelize) {
      // Add commands to revert seed here.
     
      await queryInterface.bulkDelete('Brands', null, {});
  }
};
