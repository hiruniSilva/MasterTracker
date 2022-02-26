'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.belongsToMany(models.Branch, {
        foreignKey: 'teams', 
        through: 'BranchTeams',
        timestamps: false
      });
    }
  }
  Team.init({
    TeamName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};