'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MasterTracks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      BI: {
        type: Sequelize.INTEGER,
        references: { model: 'BIs', key: 'id' }
      },
      LeadSource: {
        type: Sequelize.INTEGER,
        references: { model: 'LeadSources', key: 'id' }
      },
      Brand: {
        type: Sequelize.INTEGER,
        references: { model: 'Brands', key: 'id' }
      },
      Aid: {
        type: Sequelize.STRING,
        unique: true
      },
      DateFTD: {
        type: Sequelize.DATE
      },
      Email: {
        type: Sequelize.STRING,
        unique: true
      },
      FTDAmount: {
        type: Sequelize.DECIMAL
      },
      CurrencyCode: {
        type: Sequelize.INTEGER,
        references: { model: 'Currencies', key: 'id' }
      },
      SalesAgent: {
        type: Sequelize.STRING
      },
      Retention: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MasterTracks');
  }
};