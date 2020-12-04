const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // access 'Product' model and run 'findAll()' method on database
  Product.findAll({
    // attributes: ['id', 'product_name', 'price', 'stock'],
    // includes associated Category and Tag data
    include: [
      Category,
      {
        model: Tag,
        through: ProductTag,
      },
    ],
  })
    // data resulting from query is returned from database as JSON response
    .then((dbProductData) => res.json(dbProductData))
    // if error sends error message as JSON response 
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by passing `id` as an argument to the 'findOne()' method
  Product.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'product_name', 'price', 'stock'],
    // includes associated Category and Tag data
    include: [
      {
        model: Category,
        attributes: ['category_name'],
      },
      {
        model: Tag,
        attributes: ['tag_name'],
        through: ProductTag,
      }
    ]
  })
    // if there are no results from the query, a related response is returned
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({ message: 'There are no products with this id.' });
        return;
      }
      res.json(dbProductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// add a new product to the database
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  // inserts new data using Sequelize 'create()' method and passing in key/value pairs; keys are defined in the 'Product' model and values are returned from req.body
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// updates existing product with 'update()' method using both 'req.body' (creates/provides new data) and 'req.params' (indicates where new data should be used)
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// delete a product from the database
router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  Product.destroy({
    // identifier indicates exactly which object to delete from the database
    where: {
      id: req.params.id
    }
  })
    .then(dbProductData => {
      if (!dbProductData) {
        res.status(404).json({ message: 'There are no products with that id.' })
        return;
      }
      res.json(dbProductData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
