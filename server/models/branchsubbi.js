'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BranchSubBI extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BranchSubBI.belongsTo(models.Branch,{
        foreignKey: 'branch',
      });
      BranchSubBI.belongsTo(models.BI,{
        foreignKey: 'subBI',
      });
    }
  }
  BranchSubBI.init({
    branch: DataTypes.INTEGER,
    subBI: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BranchSubBI',
  });
  return BranchSubBI;
};