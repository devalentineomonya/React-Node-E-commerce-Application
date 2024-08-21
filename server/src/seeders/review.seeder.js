const mongoose = require('mongoose');
const ReviewModel = require('../models/review.model');
const UserModel = require('../models/user.model');
const ProductModel = require('../models/product.model');
const connectDB = require('../config/db');

const seedReview = async () => {
  await connectDB()
  await ReviewModel.deleteMany({});

  const user = await UserModel.findOne({ email: 'test@email.com' });
  const product = await ProductModel.findOne({ name: 'Product 1' });

  const reviews = [
    {
      user: user._id,
      product: product._id ,
      rating: 5,
      comment: 'Great product!',
    },
    {
      user: user._id,
      product: product._id ,
      rating: 4,
      comment: 'Very good, but could be better.',
    },
  ];

  await ReviewModel.insertMany(reviews);
  console.log('Reviews seeded successfully');
  mongoose.connection.close();
};

seedReview().catch((err) => console.error(err));
