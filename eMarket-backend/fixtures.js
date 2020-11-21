const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const Category = require('./model/Category');
const User = require('./model/User');
const Product = require('./model/Product');

mongoose.connect('mongodb://localhost/eMarket',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;

db.once('open', async () => {
  try {
    await db.dropCollection('categories');
    await db.dropCollection('products');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collection were not presented, skipping drop...');
  }

  const [categoryComputers, categoryCars, categoryClothes, categoryElectronics] = await Category.create({
    title: 'Computers',
  }, {
    title: 'Cars',
  }, {
    title: 'Clothes',
  }, {
    title: 'Electronics',
  });

  const [userJohn, userTony] = await User.create({
    username: 'John Wick',
    password: '001',
    display_name: 'John',
    phone_number: '555-000-000',
    token: nanoid(),
  }, {
    username: 'Tony Start',
    password: '001',
    display_name: 'Tony',
    phone_number: '999-000-000',
    token: nanoid(),
  });

  await Product.create({
    user: userJohn._id,
    title: 'Toyota Camry ',
    price: 15000,
    category: categoryCars._id,
    image: '',
  }, {
    user: userJohn._id,
    title: 'Apple Macbook Pro 13',
    price: 1500,
    category: categoryComputers._id,
    image: '',
  }, {
    user: userTony._id,
    title: 'Zara shirt',
    price: 100,
    category: categoryClothes._id,
    image: ''
  }, {
    user: userTony._id,
    title: 'Apple iPhone 12 Pro',
    price: 1200,
    category: categoryElectronics._id,
    image: ''
  });

  db.close();
});