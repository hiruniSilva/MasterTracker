'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Branches', [{
      BranchName: 'Alpho',
    },{
      BranchName: 'Evolve',
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Branches', null, {});
  }
};
