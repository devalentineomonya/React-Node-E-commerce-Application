const mongoose = require('mongoose');
const axios = require('axios');
const ProductModel = require('../models/product.model');
const Brand = require('../models/brand.model');
const Category = require('../models/category.model');
const connectDB = require('../config/db');

const seedProducts = async () => {
  try {
    await connectDB();

    // Clear existing products
    await ProductModel.deleteMany({});

    // Fetch brands and categories
    const brand1 = await Brand.findOne({ name: 'BrandName1' });
    const brand2 = await Brand.findOne({ name: 'BrandName2' });
    const category1 = await Category.findOne({ name: 'CategoryName1' });
    const category2 = await Category.findOne({ name: 'CategoryName2' });

    // Fetch products data from the API
    const response = await axios.get('https://dummyjson.com/products?limit=20');
    const fetchedProducts = response.data.products;

    const getRandomLabel = () => {
      const labels = ["BestSelling", "Popular", "Featured", "Trending", "New"];
      const randomIndex = Math.floor(Math.random() * labels.length);
      return labels[randomIndex];
    };
    
    // Map fetched data to your product schema
    const products = fetchedProducts.map((product, index) => {
      const brand = index % 2 === 0 ? brand1._id : brand2._id;
      const category = index % 2 === 0 ? category1._id : category2._id;

      return {
        name: product.title,
        price: product.price,
        longDescription: product.description,
        shortDescription: `Detailed description for ${product.title}`,
        label: getRandomLabel(),  // Example label, adjust based on your needs
        type: 'General',   // Adjust based on your needs
        additionalInfo: {
          discountPercentage: product.discountPercentage,

        },
        sizes: [{ size: 'M' }],  // Example size, adjust based on your needs
        images: product.images.map((url, i) => ({ url, altText: `Product Image ${i + 1}` })),
        colorVariants: [{ color: 'Unknown', hexCode: '#000000' }],  // Adjust if color data is available
        stock: product.stock,
        brand: [brand],
        category: [category],
      };
    });

    // Insert products into the database
    await ProductModel.insertMany(products);
    console.log('Database seeded successfully');

  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

seedProducts();
