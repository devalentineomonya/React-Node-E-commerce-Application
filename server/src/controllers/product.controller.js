const productModel = require('../models/product.model')
const formatProductResponse = (product) => {
  return {
    _id: product._id,
    name: product.name,
    shortDescription: product.shortDescription,
    price: product.price,
    images: product.images.length > 0 ? product.images[0].url : null,
    rating: product.ratings.length > 0 ? product.ratings.reduce((sum, r) => sum + r.rating, 0) / product.ratings.length : 0
  };
};


const getAllProducts = async (_, res) => {
  try {
    const products = await productModel.find({}, 'name shortDescription price images ratings')
      .populate('ratings', 'rating')
      .exec();

    const formattedProducts = products.map(formatProductResponse);
    res.status(200).json({ success: true, message: "Products queried successfully", data: formattedProducts });
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred while querying for products", error: err.message });
  }
};


const getProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await productModel.findById(productId).exec();
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred while fetching product", error: err.message });
  }
};


const createProduct = async (req, res) => {
  try {
    const product = new productModel(req.body);
    await product.save();
    res.status(201).json({ success: true, message: "Product added successfully", data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred while saving the product", error: err.message });
  }
};


const updateProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await productModel.findByIdAndUpdate(productId, req.body, { new: true }).exec();
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    res.status(200).json({ success: true, message: 'Product updated successfully', data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred while updating the product", error: err.message });
  }
};


const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await productModel.findByIdAndDelete(productId).exec();
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    res.status(200).json({ success: false, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({success:false, message:"An error occurred while deleting the product", error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
