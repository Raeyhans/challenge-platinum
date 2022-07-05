'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'created_by',
        as: 'addUser',
      })
      this.belongsTo(models.Users, {
        foreignKey: 'updated_by',
        as: 'updateUser',
      })
    }
  }
  Categories.init({
    seotitle: DataTypes.STRING,
    title: DataTypes.STRING,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Categories',
    tableName: 'categories',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    createdBy: 'created_by',
    updatedBy: 'updated_by',
  });
  return Categories;
};