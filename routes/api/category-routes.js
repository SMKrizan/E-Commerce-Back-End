const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: ['id', 'category_name'],
    // including associated Products
    include: [
      {
        model: Product,
        attributes: ['product_name', 'price', 'stock']
      }
    ]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'category_name'],
    // including any associated Products
    include: [
      {
        model: Product,
        attributes: ['product_name', 'price', 'stock']
      }
    ]
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'There is no category with that id.' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // creates new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(newCategory => res.json(newCategory))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // updates category by `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(newCategoryName => {
    if (!newCategoryName) {
      res.status(404).json({ message: 'There is no Category with that id.' });
      return;
    }
    res.json(newCategoryName);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete category by `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(categoryRemoved => {
    if (!categoryRemoved) {
      res.status(404).json({ message: 'There is no Category with that id.' });
      return;
    }
    res.json(categoryRemoved);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
