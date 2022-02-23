'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Configs', [{
      key: 'HEAD_COUNT',
      value: 50
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Configs', null, {});
  }
};
