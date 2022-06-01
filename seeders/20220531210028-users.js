"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        name: "admin",
        email: "admin@gmail.com",
        password: "$2a$08$zg62KYINczNlGdKP/fMED.fdhvwFpOSS.uAZEqN9v4VBT99MeD7DG",
        isAdmin: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kurniadi Ahmad Wijaya",
        email: "kurniadiahmadwijaya@gmail.com",
        password: "$2a$08$lcEujyxIVc5GPrBwxmvlJesoLJrNFzCSA1yfZLo4pdj62Ew47mwdS",
        isAdmin: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Shadifa Auliatama Harjanto",
        email: "bangshadif@gmail.com",
        password: "$2a$08$lcEujyxIVc5GPrBwxmvlJesoLJrNFzCSA1yfZLo4pdj62Ew47mwdS",
        isAdmin: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", {}, null);
  },
};