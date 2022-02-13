'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BI extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BI.hasMany(models.MasterTrack,{foreignKey:"BI"})
    }
  }
  BI.init({
    BIName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BI',
    timestamps:false
  });
  return BI;
};