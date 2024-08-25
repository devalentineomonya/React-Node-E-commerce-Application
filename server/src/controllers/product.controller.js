const mongoose = require('mongoose');
const { isValidObjectId, Types } = mongoose;

const ProductModel = require('../models/product.model');
const UserModel = require("../models/user.model");

const formatProductResponse = (product) => {
  return {
    id: product._id,
    name: product.name,
    shortDescription: product.shortDescription,
    price: product.price,
    stock: product.stock,
    type: product.type,
    label: product.label,
    brand: product.brands[0]?.name || 'Unknown',
    category: product.categories[0]?.name || 'Unknown',
    images: product.images.length > 0 ? product.images[0].url : null,
    rating: product.rating || 0,
    reviewCount: product.reviewCount || 0
  };
};

const getAllProducts = async (_, res) => {
  try {
    const products = await ProductModel.aggregate([
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'product',
          as: 'reviews'
        }
      },
      {
        $lookup: {
          from: 'brands',
          localField: 'brand',
          foreignField: '_id',
          as: 'brands'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categories'
        }
      },
      {
        $addFields: {
          rating: {
            $cond: {
              if: { $gt: [{ $size: '$reviews' }, 0] },
              then: { $divide: [{ $sum: '$reviews.rating' }, { $size: '$reviews' }] },
              else: 0
            }
          },
          reviewCount: { $size: '$reviews' }
        }
      },
      {
        $project: {
          name: 1,
          shortDescription: 1,
          price: 1,
          images: 1,
          categories: 1,
          type: 1,
          stock: 1,
          label: 1,
          rating: 1,
          reviewCount: 1,
          brands: 1
        }
      }
    ]);

    const formattedProducts = products.map(formatProductResponse);
    res.status(200).json({ success: true, message: "Products queried successfully", data: formattedProducts });
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred while querying for products", error: err.message });
  }
};

const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    if (!isValidObjectId(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const product = await ProductModel.aggregate([
      { $match: { _id: new Types.ObjectId(productId) } },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'product',
          as: 'reviews'
        }
      },
      {
        $lookup: {
          from: 'brands',
          localField: 'brand',
          foreignField: '_id',
          as: 'brandDetails'
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categoryDetails'
        }
      },
      {
        $addFields: {
          rating: {
            $cond: {
              if: { $gt: [{ $size: '$reviews' }, 0] },
              then: { $divide: [{ $sum: '$reviews.rating' }, { $size: '$reviews' }] },
              else: 0
            }
          },
          reviewCount: { $size: '$reviews' },
          brandName: { $arrayElemAt: ['$brandDetails.name', 0] },
          categoryName: { $arrayElemAt: ['$categoryDetails.name', 0] }
        }
      },
      {
        $project: {
          name: 1,
          shortDescription: 1,
          longDescription: 1,
          colorVariants: 1,
          additionalInfo: 1,
          price: 1,
          images: 1,
          category: '$categoryName',
          brand: '$brandName',
          type: 1,
          stock: 1,
          label: 1,
          sizes: 1,
          rating: 1,
          reviewCount: 1,
          reviews: {
            user: 1,
            rating: 1,
            comment: 1,
            createdAt: 1
          }
        }
      }
    ]);

    if (!product || product.length === 0) {
      return res.status(404).json({ success: false, message: "Product with the specified id does not exist" });
    }

    res.status(200).json({ success: true, message: "Product fetched successfully", data: product[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred while fetching product", error: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(201).json({ success: true, message: "Product added successfully", data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred while saving the product", error: err.message });
  }
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    if (!isValidObjectId(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const product = await ProductModel.findByIdAndUpdate(productId, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product with the specified id does not exist" });
    }

    res.status(200).json({ success: true, message: 'Product updated successfully', data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred while updating the product", error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    if (!isValidObjectId(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const product = await ProductModel.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product with the specified id does not exist" });
    }

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred while deleting the product", error: err.message });
  }
};

const addViewedProduct = async (req, res) => {
  const { user } = req;
  const { productId } = req.body;

  const userId = user.id;
  if (!isValidObjectId(userId)) {
    return res.status(401).json({ success: false, message: "User is not authenticated" });
  }

  if (!isValidObjectId(productId)) {
    return res.status(400).json({ success: false, message: "Invalid product ID" });
  }

  try {
    const userData = await UserModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let viewedItems = userData.recentItems || [];

    if (viewedItems.includes(productId)) {
      viewedItems = viewedItems.filter(item => item !== productId);
      viewedItems.push(productId);
    } else {
      if (viewedItems.length >= 10) {
        viewedItems.shift(); 
      }
      viewedItems.push(productId);
    }

    userData.recentItems = viewedItems;

    try {
      await userData.save();
      const userObject = userData.toObject();
      delete userObject.password;
      delete userObject.verificationCode;
      delete userObject.verificationCodeExpires;
      delete userObject.passwordResetCode;
      delete userObject.passwordResetCodeExpires;

      return res.status(200).json({ success: true, message: "Product added to viewed items", data: userObject });
    } catch (error) {
      console.error('Error saving user after adding viewed product:', error);
      return res.status(500).json({ success: false, message: "Server error while updating user", error: error.message });
    }
  } catch (error) {
    console.error('Error finding user:', error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


module.exports = {
  addViewedProduct,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
