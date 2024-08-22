const express = require('express')
const { getBrands, addBrand, editBrand, deleteBrand } = require('../controllers/brand.controller')
const { authMiddleware, isAdmin } = require('../middlewares/auth.middleware')

const brandRouter = express.Router()
brandRouter
    .get("/get", getBrands)
    .post("/add",authMiddleware,isAdmin, addBrand)
    .put("/updated/:brandId",authMiddleware,isAdmin, editBrand)
    .delete("/delete/:brandId",authMiddleware,isAdmin, deleteBrand)

module.exports = brandRouter