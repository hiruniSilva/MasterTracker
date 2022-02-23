'use strict';
const {
  Model
} = require('sequelize');
const yup = require('yup');

const schema = yup.object().shape({
  branchName: yup.string().required(),
  subBIs: yup.array().of(yup.number()).min(1).required()
})


module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {

    static validateBranchData(data) {
      return schema.isValidSync(data)
    }
   
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