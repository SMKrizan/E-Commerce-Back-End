const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

// extending the 'Model' class transfers functionality to the new class/model in the form of methods for creating, reading, updating and deleting data from a database
class Category extends Model {}

// the 'init()' method provides context for how the methods inherited from 'Model' should work.
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category'
  }
);

module.exports = Category;
