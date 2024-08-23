const mongoose = require('mongoose');
const { isValidObjectId, Types } = mongoose;

const ProductModel = require('../models/product.model');
const ReviewModel = require('../models/review.model');


// Format the product response
const formatProductResponse = (product) => {
  return {
    id: product._id,
    name: product.name,
    shortDescription: product.shortDescription,
    price: product.price,
    stock: product.stock,
    type: product.type,
    label: product.label,
    brand: product.brands[0].name,
    images: product.images.length > 0 ? product.images[0].url : null,
    rating: product.rating || 0,
    reviewCount: product.reviewCount || 0
  };
};

// Get all products with aggregated ratings and review counts
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
          category: 1,
          type: 1,
          stock: 1,
          label: 1,
          rating: 1,
          reviewCount: 1,
          brands: 1
        }
      }
    ]).exec();


    const formattedProducts = products.map(formatProductResponse);
    res.status(200).json({ success: true, message: "Products queried successfully", data: formattedProducts });
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred while querying for products", error: err.message });
  }
};

// Get a product by ID with aggregated ratings and review counts
const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const isValidId = isValidObjectId(productId);

    if (!isValidId) {
      return res.status(404).json({ success: false, message: "Product with the specified id does not exist" });
    }

    const product = await ProductModel.aggregate([
      { $match: { _id: new Types.ObjectId(productId) } }, // Convert productId to ObjectId
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
    ]).exec();

    if (!product || product.length === 0) {
      return res.status(404).json({ success: false, message: "Product with the specified id does not exist" });
    }

    res.status(200).json({ success: true, message: "Product fetched successfully", data: product[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred while fetching product", error: err.message });
  }
};
// Create a new product
const createProduct = async (req, res) => {
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(201).json({ success: true, message: "Product added successfully", data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred while saving the product", error: err.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const isValidId = isValidObjectId(productId);

    if (!isValidId) return res.status(404).json({ success: false, message: "Product with the specified id does not exist" });

    const product = await ProductModel.findByIdAndUpdate(productId, req.body, { new: true }).exec();
    if (!product) return res.status(404).json({ success: false, message: "Product with the specified id does not exist" });

    res.status(200).json({ success: true, message: 'Product updated successfully', data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred while updating the product", error: err.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const isValidId = isValidObjectId(productId);

    if (!isValidId) return res.status(404).json({ success: false, message: "Product with the specified id does not exist" });

    const product = await ProductModel.findByIdAndDelete(productId).exec();
    if (!product) return res.status(404).json({ success: false, message: "Product with the specified id does not exist" });

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred while deleting the product", error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
