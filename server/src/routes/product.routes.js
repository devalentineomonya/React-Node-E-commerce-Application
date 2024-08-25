const express = require('express');
const { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct,addViewedProduct } = require('../controllers/product.controller');
const { authMiddleware, isAdmin } = require('../middlewares/auth.middleware')
const productRouter = express.Router();


productRouter
  .get("/get", getAllProducts)
  .get("/get/:productId", getProductById)
  .post("/add",authMiddleware,isAdmin, createProduct)
  .put("update/:productId",authMiddleware,isAdmin, updateProduct)
  .put("/addViewed", authMiddleware, addViewedProduct)
  .delete("delete/:productId",authMiddleware,isAdmin, deleteProduct);


module.exports = productRouter;