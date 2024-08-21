const mongoose = require('mongoose');
const BrandModel = require('../models/brand.model');
const connectDB = require('../config/db');

const seedBrand = async () => {
  await connectDB()

  await BrandModel.deleteMany({});

  const brands = [
    {
      name: 'BrandName1',
      description: 'This is a description for BrandName1',
      logoUrl: 'https://prd.place/400?id=5',
      website: 'https://brandname1.com',
    },
    {
      name: 'BrandName2',
      description: 'This is a description for BrandName2',
      logoUrl: 'https://prd.place/400?id=6',
      website: 'https://brandname2.com',
    },
  ];

  await BrandModel.insertMany(brands);
  console.log('Brands seeded successfully');
  mongoose.connection.close();
};

seedBrand().catch((err) => console.error(err));
