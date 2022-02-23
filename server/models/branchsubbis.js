'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BranchSubBIS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BranchSubBIS.belongsTo(models.Branch,{
        foreignKey: 'branch',
      });
      BranchSubBIS.belongsTo(models.BI,{
        foreignKey: 'subBI',
      });
    }
  }
  BranchSubBIS.init({
    branch: DataTypes.INTEGER,
    subBI: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BranchSubBIS',
    timestamps: false
  });
  return BranchSubBIS;
};