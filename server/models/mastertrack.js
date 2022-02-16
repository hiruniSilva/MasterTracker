'use strict';
const {
  Model
} = require('sequelize');
const yup = require('yup');

const schema = yup.object().shape({
  bi: yup.string().required(),
  leadSource: yup.string().required(),
  brand: yup.string().required(),
  aid: yup.string().required(),
  dateFtd: yup.date().default(),
  email: yup.string().email().required() ,
  ftdAmount: yup.number().required().positive(),
  currCode: yup.string().required(),
  salesAgent: yup.string().required(),
  retention: yup.string().required()  
})

module.exports = (sequelize, DataTypes) => {
  class MasterTrack extends Model {

     static validateMasterData(data) {
      return schema.isValidSync(data)
    }

    static associate(models) {
      MasterTrack.belongsTo(models.BI,{ as: 'BIvalue',foreignKey:"BI"})
      MasterTrack.belongsTo(models.LeadSource,{ as: 'LeadSourceValue',foreignKey:"LeadSource"})
      MasterTrack.belongsTo(models.Brand,{ as: 'BrandValue',foreignKey:"Brand"})
      MasterTrack.belongsTo(models.Currency,{ as: 'CurrencyValue',foreignKey:"CurrencyCode"})
      MasterTrack.belongsTo(models.Database,{ as: 'DatabaseValue',foreignKey:"Database"})
      MasterTrack.belongsTo(models.Retention,{ as: 'RetentionValue',foreignKey:"Retention"})
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
    Retention: DataTypes.INTEGER,
    Database: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MasterTrack',
  });
  return MasterTrack;
};