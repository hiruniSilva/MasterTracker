'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Branch.belongsToMany(models.BI,{
        foreignKey: 'branch',
        through: 'BranchSubBIs',
        timestamps: false
      })
    }
  }
  Branch.init({
    BranchName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Branch',
    timestamps: false
  });
  return Branch;
};