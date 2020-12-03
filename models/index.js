// import models
const Category = require('./Category');
const Product = require('./Product');
const ProductTag = require('./ProductTag');
const Tag = require('./Tag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id'
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'productId'
});


// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tagId'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag
};
