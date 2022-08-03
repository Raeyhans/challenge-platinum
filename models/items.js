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
      this.belongsTo(models.Sellers, {
        foreignKey: 'seller_code',
        as: 'sellerCode',
      })
      this.hasMany(models.ItemGallery, {
        foreignKey: 'id_item',
        as: 'itemGalleries',
      })
      this.belongsTo(models.Sellers, {
        foreignKey: 'created_by',
        as: 'createdBy',
      })
      this.belongsTo(models.Sellers, {
        foreignKey: 'updated_by',
        as: 'updatedBy',
      })
    }
  }
  Items.init({
    seller_code: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    code: DataTypes.STRING,
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Items',
    tableName: 'items',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    createdBy: 'created_by',
    updatedBy: 'updated_by',
  });
  return Items;
};