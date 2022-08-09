'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Customers, {
        foreignKey: 'id_customer',
        as: 'chatCustomer',
      })
      this.belongsTo(models.Users, {
        foreignKey: 'id_seller',
        as: 'chatUser',
      })
    }
  }
  Messages.init({
    from: DataTypes.STRING,
    id_customer: DataTypes.INTEGER,
    id_seller: DataTypes.INTEGER,
    message: DataTypes.STRING,
    read_by: DataTypes.STRING,
    chat_group: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Messages',
    tableName: 'messages',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Messages;
};