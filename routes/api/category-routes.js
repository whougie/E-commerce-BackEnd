const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const result = await Category.findAll({
      include: [{ model: Product}]
    })
    res.json({ status: "success", payload: result });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message});
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const result = await Category.findByPk(req.params.id, {include: [{ model: Product}]} )
    res.status(200).json(result);
  } catch(error){
    console.log(error)
    res.status(400).json( {status: "error", message: error.message} )
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const result = await Category.create(req.body);
    res.json({ status: "success", payload: result })
  } catch(error){
    console.log(error)
    res.status(400).json( {status: "error", message: error.message} )
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const result = Category.update(req.body, { where: { id: req.params.id }, individualHooks: true});
    res.json({ status: "success", payload: result });
  } catch(error){
    console.log(error)
    res.status(400).json( {status: "error", message: error.message} )
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const result = await Category.destroy({ where: { id: req.params.id } } );
    res.json({status: "Deleted", payload: result});
  } catch(error){
    console.log(error)
    res.status(400).json( {status: "error", message: error.message} )
  }
});

module.exports = router;
