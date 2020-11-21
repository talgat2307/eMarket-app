const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const users = require('./app/users');
const products = require('./app/products');
const categories = require('./app/categories');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run = async () => {
  await mongoose.connect('mongodb://localhost/eMarket',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

  app.use('/users', users);
  app.use('/products', products);
  app.use('/categories', categories);

  console.log('Connected to MongoDB');
  app.listen(port, () => console.log('Server started'));
};

run().catch(console.error);