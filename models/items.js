'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Customers, {
        foreignKey: 'customer_code',
        as: 'cCode',
      })
      this.hasMany(models.ItemGallery, {
        foreignKey: 'id_item',
        as: 'itemGallery',
      })
    }
  }
  Items.init({
    customer_code: DataTypes.STRING,
    code: DataTypes.STRING,
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Items',
    tableName: 'items',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    updatedBy: 'updated_by',
  });
  return Items;
};