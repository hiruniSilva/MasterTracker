'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Currency.hasMany(models.MasterTrack,{foreignKey:"CurrencyCode"})
    }
  }
  Currency.init({
    CurrencyCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Currency',
    timestamps:false
  });
  return Currency;
};