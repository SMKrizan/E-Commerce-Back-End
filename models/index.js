// import models
const Category = require('./Category');
const Product = require('./Product');
const ProductTag = require('./ProductTag');
const Tag = require('./Tag');

// Categories have many Products
Category.hasMany(Product, {
  foreign_key: 'id'
});

// Products belongsTo Category
Product.belongsTo(Category, {
  foreign_key: 'category_id'
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreign_key: 'productId'
});


// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreign_key: 'tagId'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag
};
