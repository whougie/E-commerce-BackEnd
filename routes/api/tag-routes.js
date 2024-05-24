const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const result = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'tag_with_products' }]
    })
    res.json({ status: "success", payload: result });
  } catch(error){
    res.status(400).json({ status: "error", message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const result = await Tag.findByPk(req.params.id, 
      {include: [{ model: Product, through: ProductTag, as: 'tag_with_products' }]}
    );
    res.json({ status: "success", payload: result });
  } catch(error){
    res.status(400).json({ status: "error", message: error.message });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const result = await Tag.create(req.body);
    res.json({ status: "success", payload: result });
  } catch(error){
    console.log(error)
    res.status(400).json( {status: "error", message: error.message} )
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const result = Tag.update(req.body, { where: { id: req.params.id }, individualHooks: true});
    res.json({ status: "success", payload: result });
  } catch(error){
    console.log(error)
    res.status(400).json( {status: "error", message: error.message} )
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const result = await Tag.destroy({ where: { id: req.params.id } } );
    res.json({status: "Deleted", payload: result});
  } catch(error){
    console.log(error)
    res.status(400).json( {status: "error", message: error.message} )
  }
});

module.exports = router;
