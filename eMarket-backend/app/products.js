const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const Product = require('../model/Product');
const auth = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get('/', async (req, res) => {

  let query;
  if (req.query.category) {
    query = { category: req.query.category };
  }

  try {
    const posts = await Product.find(query).populate('category');
    res.send(posts);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Product.findById(req.params.id).
      populate('category').
      populate('user');
    res.send(post);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
  const post = new Product({
    ...req.body,
    user: req.user._id,
    price: parseInt(req.body.price),
  });

  if (req.file) {
    post.image = req.file.filename;
  }

  try {
    await post.save();
    res.send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({ message: 'Success' });
  } catch (e) {
    res.status(403).send(e);
  }

});

module.exports = router;