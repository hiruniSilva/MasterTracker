'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Branches', [{
      BranchName: 'Alpho',
      BI: 1
    },{
      BranchName: 'Evolve',
      BI: 2
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Branches', null, {});
  }
};
