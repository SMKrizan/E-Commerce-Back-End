const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        // references the 'Product' model
        model: 'product',
        // column name of interest within referenced model
        key: 'id'
      }
    },
    tagId: {
      type: DataTypes.INTEGER,
      references: {
        // references the 'Tag' model
        model: 'tag',
        // column name of referenced model
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag'
  }
);

module.exports = ProductTag;
