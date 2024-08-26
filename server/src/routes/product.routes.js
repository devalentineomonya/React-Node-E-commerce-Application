const express = require('express');
const { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct,addViewedProduct, setProductLike } = require('../controllers/product.controller');
const { authMiddleware, isAdmin } = require('../middlewares/auth.middleware')
const productRouter = express.Router();


productRouter
  .get("/get", getAllProducts)
  .get("/get/:productId", getProductById)
  .post("/add",authMiddleware,isAdmin, createProduct)
  .put("update/:productId",authMiddleware,isAdmin, updateProduct)
  .put("/addView", authMiddleware, addViewedProduct)
  .put("/setLike", authMiddleware, setProductLike)
  .delete("delete/:productId",authMiddleware,isAdmin, deleteProduct);


module.exports = productRouter;