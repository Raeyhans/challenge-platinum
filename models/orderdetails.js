'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orderdetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Orders, {
        foreignKey: 'order_id',
        as: 'order',
      })
      this.belongsTo(models.Items, {
        foreignKey: 'item_id',
        as: 'item',
      })
    }
  }
  Orderdetails.init({
    order_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orderdetails',
    tableName: 'order_details',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Orderdetails;
};