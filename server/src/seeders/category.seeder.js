const mongoose = require('mongoose');
const CategoryModel = require('../models/category.model');
const connectDB = require('../config/db');

const seedCategory = async () => {
  await connectDB()

  await CategoryModel.deleteMany({});

  const categories = [
    {
      name: 'CategoryName1',
      description: 'This is a description for CategoryName1',
      imageUrl: 'https://prd.place/400?id=8',
    },
    {
      name: 'CategoryName2',
      description: 'This is a description for CategoryName2',
      imageUrl: 'https://prd.place/400?id=7',
    },
  ];

  await CategoryModel.insertMany(categories);
  console.log('Categories seeded successfully');
  mongoose.connection.close();
};

seedCategory().catch((err) => console.error(err));
