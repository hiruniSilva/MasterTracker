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
      BI.hasMany(models.VAFirstCall,{foreignKey:"BI"})
      BI.belongsToMany(models.User, {
        foreignKey: 'bi', 
        through: 'UserTeams',
        timestamps: false
      });
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