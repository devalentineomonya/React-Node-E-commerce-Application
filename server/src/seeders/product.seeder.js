const mongoose = require('mongoose');
const axios = require('axios');
const ProductModel = require('../models/product.model');
const Brand = require('../models/brand.model');
const Category = require('../models/category.model');
const connectDB = require('../config/db');

const seedProducts = async () => {
  try {
    await connectDB();

    await ProductModel.deleteMany({});

    const brand1 = await Brand.findOne({ name: 'BrandName1' });
    const brand2 = await Brand.findOne({ name: 'BrandName2' });
    const category1 = await Category.findOne({ name: 'Speakers' });
    const category2 = await Category.findOne({ name: 'Microphones' });

    const response = await axios.get('https://dummyjson.com/products?limit=20');
    const fetchedProducts = response.data.products;

    const getRandomLabel = () => {
      const labels = ["BestSelling", "Popular", "Featured", "Trending", "New"];
      const randomIndex = Math.floor(Math.random() * labels.length);
      return labels[randomIndex];
    };
    
   
    const products = fetchedProducts.map((product, index) => {
      const brand = index % 2 === 0 ? brand1._id : brand2._id;
      const category = index % 2 === 0 ? category1._id : category2._id;

      return {
        name: product.title,
        price: product.price,
        longDescription: product.description,
        shortDescription: `Detailed description for ${product.title}`,
        label: getRandomLabel(),  
        type: 'General',   
        additionalInfo: {
          discountPercentage: product.discountPercentage,

        },
        sizes: [{ size: 'M' }], 
        images: product.images.map((url, i) => ({ url, altText: `Product Image ${i + 1}` })),
        colorVariants: [{ color: 'Unknown', hexCode: '#000000' }],  
        stock: product.stock,
        brand: [brand],
        category: [category],
      };
    });

  
    await ProductModel.insertMany(products);
    console.log('Products seeded successfully');

  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

seedProducts();
