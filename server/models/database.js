'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Database extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Database.hasMany(models.MasterTrack,{foreignKey:"Database"})
    }
  }
  Database.init({
    dbName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Database',
    timestamps:false
  });
  return Database;
};