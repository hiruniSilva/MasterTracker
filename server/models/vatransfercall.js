"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class VATransferCall extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			VATransferCall.belongsTo(models.Branch, { as: "BranchValue", foreignKey: "Branch" });
		}
	}
	VATransferCall.init(
		{
			Branch: DataTypes.INTEGER,
			Transfer: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "VATransferCall",
		}
	);
	return VATransferCall;
};
