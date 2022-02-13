'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Brand.hasMany(models.MasterTrack,{foreignKey:"Brand"})
    }
  }
  Brand.init({
    BrandName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Brand',
    timestamps:false
  });
  return Brand;
};