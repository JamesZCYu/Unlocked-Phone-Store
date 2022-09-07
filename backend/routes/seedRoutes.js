// Seeds user and product data to the MongoDB database
import express from 'express';
import data from '../data.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

// Fill the productModel with the data from data.js
seedRouter.get('/', async (req, res) => {
  // products
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  // users
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers, createdProducts });
});

export default seedRouter;
