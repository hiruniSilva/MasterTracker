'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTeam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserTeam.belongsTo(models.User, { 
        foreignKey: 'user', 
      });
      UserTeam.belongsTo(models.BI, { 
        foreignKey: 'bi', 
      });
    }
  }
  UserTeam.init({
    user: DataTypes.INTEGER,
    bi: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserTeam',
    timestamps: false
  });
  return UserTeam;
};