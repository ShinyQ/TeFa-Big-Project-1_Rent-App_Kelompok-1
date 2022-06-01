"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("items", [
      {
        "id": 1,
        "userId": 1,
        "categoryId": 1,
        "name": "Canon IEEE",
        "price": 250000,
        "isAvailable": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "id": 2,
        "userId": 2,
        "categoryId": 1,
        "name": "Xerox 2560",
        "price": 380000,
        "isAvailable": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
      },
      {
        "id": 3,
        "userId": 2,
        "categoryId": 2,
        "name": "Nike 45001",
        "price": 568000,
        "isAvailable": true,
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", {}, null);
  },
};