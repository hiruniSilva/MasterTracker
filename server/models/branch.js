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
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Branch extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Branch.hasMany(models.VATransferCall, { foreignKey: "Branch" });
			Branch.belongsToMany(models.BI, {
				foreignKey: "branch",
				through: "BranchSubBIs",
				timestamps: false,
			});
		}
	}
	Branch.init(
		{
			BranchName: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Branch",
			timestamps: false,
		}
	);
	return Branch;
};
