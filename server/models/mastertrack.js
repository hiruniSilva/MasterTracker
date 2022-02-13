'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MasterTrack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MasterTrack.belongsTo(models.BI,{ as: 'BIvalue',foreignKey:"BI"})
      MasterTrack.belongsTo(models.LeadSource,{ as: 'LeadSourceValue',foreignKey:"LeadSource"})
      MasterTrack.belongsTo(models.Brand,{ as: 'BrandValue',foreignKey:"Brand"})
      MasterTrack.belongsTo(models.Currency,{ as: 'CurrencyValue',foreignKey:"CurrencyCode"})
    }
  }
  MasterTrack.init({
    BI: DataTypes.INTEGER,
    LeadSource: DataTypes.INTEGER,
    Brand: DataTypes.INTEGER,
    Aid: DataTypes.STRING,
    DateFTD: DataTypes.DATE,
    Email: DataTypes.STRING,
    FTDAmount: DataTypes.DECIMAL,
    CurrencyCode: DataTypes.INTEGER,
    SalesAgent: DataTypes.STRING,
    Retention: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MasterTrack',
  });
  return MasterTrack;
};