'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BranchTeam extends Model {
    static associate(models) {
      BranchTeam.belongsTo(models.Branch,{
        foreignKey: 'branch',
      });
      BranchTeam.belongsTo(models.Team,{
        foreignKey: 'teams',
      });
    }
  }
  BranchTeam.init({
    branch: DataTypes.INTEGER,
    teams: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BranchTeam',
  });
  return BranchTeam;
};