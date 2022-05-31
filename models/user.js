'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.hasMany(models.transaction, {
        as: 'transactions_user',
        foreignKey: 'userId'
      })

      user.hasMany(models.transaction, {
        as: 'transactions_owner',
        foreignKey: 'ownerId'
      })

      user.hasMany(models.item, {
        as: 'items',
        foreignKey: 'userId'
      })
    }
  }
  user.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    token: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};