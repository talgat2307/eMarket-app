const router = require('express').Router();
const Category = require('../model/Category');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (e) {
    res.sendStatus(500);
  }
});
router.post('/', async (req, res) => {
  const category = new Category(req.body);
  try {
    await category.save();
    res.send(category);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;