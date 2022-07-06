'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sellers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sellers.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    code: DataTypes.STRING,
    token: DataTypes.STRING,
    status: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    updated_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sellers',
    tableName: 'sellers',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    updatedBy: 'updated_by',
  });
  return Sellers;
};