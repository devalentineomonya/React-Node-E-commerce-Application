const mongoose = require('mongoose');
const ReviewModel = require('../models/review.model');
const UserModel = require('../models/user.model');
const ProductModel = require('../models/product.model');
const connectDB = require('../config/db');

const seedReview = async () => {
  await connectDB();
  await ReviewModel.deleteMany({});

  const users = await UserModel.find();
  const products = await ProductModel.find();

  if (users.length === 0 || products.length === 0) {
    console.error('No users or products found in the database.');
    return;
  }

  const getRandomUser = () => users[Math.floor(Math.random() * users.length)];
  const getRandomProduct = () => products[Math.floor(Math.random() * products.length)];

  const reviews = [
    {
      user: getRandomUser()._id,
      product: getRandomProduct()._id,
      rating: 5,
      comment: 'Great product!',
    },
    {
      user: getRandomUser()._id,
      product: getRandomProduct()._id,
      rating: 4,
      comment: 'Very good, but could be better.',
    },
  ];

  await ReviewModel.insertMany(reviews);
  console.log('Reviews seeded successfully');
  mongoose.connection.close();
};

seedReview().catch((err) => console.error(err));
