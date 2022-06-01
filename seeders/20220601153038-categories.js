"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("categories", [
      {
        name: "Kamera",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sepatu",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", {}, null);
  },
};