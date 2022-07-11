'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemGallery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      this.belongsTo(models.Items, {
        foreignKey: 'id_item',
        as: 'item',
      })
      this.belongsTo(models.Sellers, {
        foreignKey: 'created_by',
        as: 'createdBy',
      })
    }
  }
  ItemGallery.init({
    id_item: DataTypes.INTEGER,
    picture: DataTypes.STRING,
    picture_url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${process.env.APP_URL||'http://localhost:3000'}/${this.picture}`
      }
    },
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ItemGallery',
    tableName: 'item_galleries',
    createdBy: 'created_by',
    updatedBy: 'updated_by',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return ItemGallery;
};