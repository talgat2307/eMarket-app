const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  image: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    require: true
  }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;