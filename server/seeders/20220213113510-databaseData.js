'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
      // Add seed commands here.
      // Example:
      await queryInterface.bulkInsert('Databases', [{
        dbName: 'UAE/10K/2022.01.05',
      },{
        dbName: 'India/50K/2022.02.15'
      }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
