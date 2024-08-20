const express = require('express');
const { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/product.controller');
const productRouter = express.Router();


productRouter
  .get("/get", getAllProducts)
  .get("/get/:productId", getProductById)
  .post("/add", createProduct)
  .put("update/:productId", updateProduct)
  .delete("delete/:productId", deleteProduct);


module.exports = productRouter;