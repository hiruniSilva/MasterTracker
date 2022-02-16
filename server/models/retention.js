'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Retention extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Retention.hasMany(models.MasterTrack,{foreignKey:"Retention"})
    }
  }
  Retention.init({
    retentionName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Retention',
    timestamps:false
  });
  return Retention;
};