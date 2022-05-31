'use strict';
const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    static associate(models) {
      item.hasOne(models.user)
      item.hasOne(models.category)
    }
  }
  item.init({
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    isAvailable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'item',
  });
  return item
};