'use strict';
const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    static associate(models) {
      transaction.belongsTo(models.item)

      transaction.belongsTo(models.user, {
        as: 'owner',
        foreignKey: 'ownerId'
      })

      transaction.belongsTo(models.user, {
        as: 'user',
        foreignKey: 'userId'
      })
    }
  }
  transaction.init({
    userId: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    status: DataTypes.STRING,
    deadline: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};