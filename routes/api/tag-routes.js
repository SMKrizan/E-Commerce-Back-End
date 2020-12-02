const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // finds all tags
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    // includes associated 'Product' data
    include:
      {
        model: Product,
        attributes: ['product_name', 'price', 'stock'],
        through: ProductTag,
        as: 'products'
      }
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // finds a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'tag_name'],
    // includes associated 'Product' data
    include:  {
      model: Product,
      attributes: ['product_name', 'price', 'stock'],
      through: ProductTag,
      as: 'products'
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'There are no tags with this id.' });
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // creates new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(newTagName => res.json(newTagName))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // updates tag name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(newTagName => {
    if (!newTagName) {
      res.status(404).json({ message: 'There is no Tag available with that id.' });
      return;
    }
    res.json(newTagName);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete tag by `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagRemoved => {
    if (!tagRemoved) {
      res.status(404).json({ message: 'There is no tag with that id.' });
      return;
    }
    res.json(tagRemoved)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
