'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VAFirstCall extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      VAFirstCall.belongsTo(models.Team,{ as: 'TeamValue',foreignKey:"Team"})
    }
  }
  VAFirstCall.init({
    Team: DataTypes.INTEGER,
    canvases: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'VAFirstCall',
  });
  return VAFirstCall;
};