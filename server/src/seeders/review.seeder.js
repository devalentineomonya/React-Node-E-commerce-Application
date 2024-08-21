const mongoose = require('mongoose');
const Review = require('../models/review.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');
const connectDB = require('../config/db');

const seedReview = async () => {
 await connectDB()
  await Review.deleteMany({});

  const user = await User.findOne({ email: 'test@email.com' });
  const product = await Product.findOne({ name: 'Product 1' }); 

  const reviews = [
    {
      user: user._id,
      product: product._id,
      rating: 5,
      comment: 'Great product!',
    },
    {
      user: user._id,
      product: product._id,
      rating: 4,
      comment: 'Very good, but could be better.',
    },
  ];

  await Review.insertMany(reviews);
  console.log('Reviews seeded successfully');
  mongoose.connection.close();
};

seedReview().catch((err) => console.error(err));
