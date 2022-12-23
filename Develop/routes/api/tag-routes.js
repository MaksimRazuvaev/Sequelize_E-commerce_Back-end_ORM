const router = require('express').Router();
const sequelize = require('../../config/connection');  // do I need this???
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  try {
    const tagsAll = await Tag.findAll({ 
      include: [{ model: Product }],  ///WHAT is for???
    });
    res.status(200).json(tagsAll);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  try {
    const tagsAll = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],  ///WHAT is for???
    });

    if (!tagsAll) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagsAll);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
/* req.body should look like this...
    {
      tag_name: "New Tag",
    }
  */
  // create a new tag
  Tag.create(req.body)
  .then((tag) => {
    res.status(200).json(tag);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value  ??? What is inside PUT request ???
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((tag) => {
    res.status(200).json(tag);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value

  try {
    const tagtData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagtData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;