'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeadSource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LeadSource.hasMany(models.MasterTrack,{foreignKey:"LeadSource"})
    }
  }
  LeadSource.init({
    LeadSourceName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LeadSource',
    timestamps:false
  });
  return LeadSource;
};