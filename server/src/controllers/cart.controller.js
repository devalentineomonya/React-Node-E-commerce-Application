const mongoose = require('mongoose');
const CartModel = require('../models/cart.model');
const ProductModel = require('../models/product.model');

const getCart = async (req, res) => {
  const { user } = req;
  const userId = user.id;

  const isValidId = mongoose.isValidObjectId(userId);
  if (!isValidId) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }

  try {
    const userCart = await CartModel.findOne({ user: userId }).populate('items.product');

    if (!userCart) {
      return res.status(404).json({ success: false, message: "Cart is empty or not found" });
    }

    return res.status(200).json({ success: true, message: "Cart retrieved successfully", data: userCart });
  } catch (error) {
    return res.status(500).json({ success: false, message: "An error occurred while retrieving the cart", error: error.message });
  }
};

const addToCart = async (req, res) => {
  const { productId } = req.body;
  const { user } = req;
  const userId = user.id;

  const isValidId = mongoose.isValidObjectId(productId);
  if (!isValidId) {
    return res.status(400).json({ success: false, message: "Invalid product ID" });
  }

  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product with the specified ID was not found" });
    }

    if (product.stock < 1) {
      return res.status(409).json({ success: false, message: "Product is out of stock" });
    }

    let userCart = await CartModel.findOne({ user: userId });

    if (!userCart) {
      userCart = new CartModel({ user: userId, items: [] });
    }

    const productInCart = userCart.items.find(item => item.product.toString() === productId);

    if (productInCart) {
      return res.status(409).json({ success: false, message: "Product already exists in the cart" });
    } else {
      userCart.items.push({
        product: productId,
        quantity: 1,
      });

      await userCart.save();
      product.stock -= 1; 
      await product.save();

      return res.status(201).json({ success: true, message: "Product added to cart successfully", data: userCart });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "An error occurred while adding the product to the cart", error: error.message });
  }
};

const incrementQuantity = async (req, res) => {
  const { productId } = req.body;
  const { user } = req;
  const userId = user.id;

  const isValidId = mongoose.isValidObjectId(productId);
  if (!isValidId) {
    return res.status(400).json({ success: false, message: "Invalid product ID" });
  }

  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product with the specified ID was not found" });
    }

    const userCart = await CartModel.findOne({ user: userId });

    if (!userCart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const productInCart = userCart.items.find(item => item.product.toString() === productId);
    if (!productInCart) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    if (product.stock < 1) {
      return res.status(409).json({ success: false, message: "Product is out of stock" });
    }

    productInCart.quantity += 1;
    await userCart.save();

    product.stock -= 1; 
    await product.save();

    return res.status(200).json({ success: true, message: "Product quantity incremented successfully", data: userCart });
  } catch (error) {
    return res.status(500).json({ success: false, message: "An error occurred while incrementing the product quantity", error: error.message });
  }
};

const decrementQuantity = async (req, res) => {
  const { productId } = req.body;
  const { user } = req;
  const userId = user.id;

  const isValidId = mongoose.isValidObjectId(productId);
  if (!isValidId) {
    return res.status(400).json({ success: false, message: "Invalid product ID" });
  }

  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product with the specified ID was not found" });
    }

    const userCart = await CartModel.findOne({ user: userId });

    if (!userCart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const productInCart = userCart.items.find(item => item.product.toString() === productId);
    if (!productInCart) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    if (productInCart.quantity > 1) {
      productInCart.quantity -= 1;
      product.stock += 1; 
    } else {
      userCart.items = userCart.items.filter(item => item.product.toString() !== productId);
      product.stock += 1; 
    }

    await userCart.save();
    await product.save();

    return res.status(200).json({ success: true, message: "Product quantity decremented successfully", data: userCart });
  } catch (error) {
    return res.status(500).json({ success: false, message: "An error occurred while decrementing the product quantity", error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const { user } = req;
  const userId = user.id;

  const isValidId = mongoose.isValidObjectId(productId);
  if (!isValidId) {
    return res.status(400).json({ success: false, message: "Invalid product ID" });
  }

  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product with the specified ID was not found" });
    }

    const userCart = await CartModel.findOne({ user: userId });

    if (!userCart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const productInCart = userCart.items.find(item => item.product.toString() === productId);
    if (!productInCart) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    userCart.items = userCart.items.filter(item => item.product.toString() !== productId);
    product.stock += productInCart.quantity; 

    await userCart.save();
    await product.save();

    return res.status(200).json({ success: true, message: "Product removed from cart successfully", data: userCart });
  } catch (error) {
    return res.status(500).json({ success: false, message: "An error occurred while removing the product from the cart", error: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart
};
