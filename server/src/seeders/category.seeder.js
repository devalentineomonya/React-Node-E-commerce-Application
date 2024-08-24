const mongoose = require('mongoose');
const CategoryModel = require('../models/category.model');
const connectDB = require('../config/db');

const seedCategory = async () => {
  await connectDB();

  // Clear existing categories
  await CategoryModel.deleteMany({});

  // Define new categories with dummy images
  const categories = [
    {
      name: 'Headphones',
      description: 'High-quality headphones for all your audio needs.',
      imageUrl: 'https://picsum.photos/400/300?random=1',
    },
    {
      name: 'Speakers',
      description: 'Premium speakers to amplify your music experience.',
      imageUrl: 'https://picsum.photos/400/300?random=2',
    },
    {
      name: 'Microphones',
      description: 'Professional microphones for recording and broadcasting.',
      imageUrl: 'https://picsum.photos/400/300?random=3',
    },
    {
      name: 'Earbuds',
      description: 'Compact earbuds for high-quality sound on the go.',
      imageUrl: 'https://picsum.photos/400/300?random=4',
    },
    {
      name: 'Headsets',
      description: 'Comfortable headsets for gaming and communication.',
      imageUrl: 'https://picsum.photos/400/300?random=5',
    },
    {
      name: 'Amplifiers',
      description: 'Powerful amplifiers to boost your audio setup.',
      imageUrl: 'https://picsum.photos/400/300?random=6',
    },
    {
      name: 'Turntables',
      description: 'Classic turntables for vinyl enthusiasts.',
      imageUrl: 'https://picsum.photos/400/300?random=7',
    },
    {
      name: 'Mixers',
      description: 'High-quality mixers for audio production.',
      imageUrl: 'https://picsum.photos/400/300?random=8',
    }
  ];

  // Insert the new categories
  await CategoryModel.insertMany(categories);
  console.log('Categories seeded successfully');
  mongoose.connection.close();
};

seedCategory().catch((err) => console.error(err));
