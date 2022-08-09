'use strict';
const bcrypt = require("bcrypt");
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        if(value) {
          this.setDataValue('password', bcrypt.hashSync(value, 12));
        }
      }
    },
    role: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    updated_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    updatedBy: 'updated_by',
  });
  return Users;
};