const mongoose = require('mongoose');
const ProductModel = require('../models/product.model');
const Brand = require('../models/brand.model');
const Category = require('../models/category.model');
const Review = require('../models/review.model');
const connectDB = require('../config/db');


const seedProducts = async () => {

  await connectDB()


  await ProductModel.deleteMany({});

  const brand1 = await Brand.findOne({ name: 'BrandName1' });
  const brand2 = await Brand.findOne({ name: 'BrandName2' });
  const category1 = await Category.findOne({ name: 'CategoryName1' });
  const category2 = await Category.findOne({ name: 'CategoryName2' });

  

  const products = [
    {
      name: 'Product 1',
      price: 29.99,
      shortDescription: 'A short description of Product 1',
      longDescription: 'A long description of Product 1',
      label: 'BestSelling',
      type: 'Clothing',
      additionalInfo: {
        material: 'Cotton',
        madeIn: 'USA'
      },
      sizes: [{ size: 'S' }, { size: 'M' }, { size: 'L' }],
      images: [
        { url: 'https://prd.place/400?id=3', altText: 'Product 1 Image 1' },
        { url: 'https://prd.place/400?id=4', altText: 'Product 1 Image 2' }
      ],
      colorVariants: [
        { color: 'Red', hexCode: '#FF0000' },
        { color: 'Blue', hexCode: '#0000FF' }
      ],
      stock: 100,
      brand: [brand1._id],
      category: [category1._id],

    },
    {
      name: 'Product 2',
      price: 49.99,
      shortDescription: 'A short description of Product 2',
      longDescription: 'A long description of Product 2',
      label: 'Popular',
      type: 'Accessories',
      additionalInfo: {
        warranty: '1 year',
        returnPolicy: '30 days'
      },
      sizes: [{ size: 'One Size' }],
      images: [
        { url: 'https://prd.place/400?id=1', altText: 'Product 2 Image 1' },
        { url: 'https://prd.place/400?id=2', altText: 'Product 2 Image 2' }
      ],
      colorVariants: [
        { color: 'Black', hexCode: '#000000' },
        { color: 'White', hexCode: '#FFFFFF' }
      ],
      stock: 50,
      brand: [brand2._id],
      category: [category2._id],
    }
  ];


  await ProductModel.insertMany(products);
  console.log('Database seeded successfully');


  mongoose.connection.close();
};


seedProducts().catch(err => console.error(err));
