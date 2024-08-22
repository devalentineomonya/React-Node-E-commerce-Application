const ProductModel = require('../models/product.model');
const ReviewModel = require('../models/review.model'); // Import the Review model
const { isValidObjectId } = require("mongoose");

// Format the product response
const formatProductResponse = (product) => {
  return {
    _id: product._id,
    name: product.name,
    shortDescription: product.shortDescription,
    price: product.price,
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
          rating: 1,
          reviewCount: 1
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

    if (!isValidId) return res.status(404).json({ success: false, message: "Product with the specified id does not exist" });

    const product = await ProductModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(productId) } },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'product',
          as: 'reviews'
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

    if (!product || product.length === 0) return res.status(404).json({ success: false, message: 'Product not found' });

    const formattedProduct = formatProductResponse(product[0]);
    res.status(200).json({ success: true, message: "Product fetched successfully", data: formattedProduct });
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
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

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
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

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
