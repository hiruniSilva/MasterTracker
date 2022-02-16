"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.changeColumn("MasterTracks", "DateFTD", {
			type: Sequelize.DATEONLY,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.changeColumn("MasterTracks", "DateFTD", {
			type: Sequelize.DATE,
		});
	},
};
