"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Users", [
			{
				fullname: "Admin User",
				email: "admin@tracker.com",
				passwordHash: await bcrypt.hash("Password@123", 10),
				roles: ["SEARCH", "DATABASE", "VIEW", "ADD_NEW_USER", "MASTER_TRACKER", "REPORT_1", "REPORT_2"],
        createdAt: new Date(),
        updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
