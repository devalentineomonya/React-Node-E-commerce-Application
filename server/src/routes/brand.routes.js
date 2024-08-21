const express = require('express')
const { getBrands, addBrand, editBrand, deleteBrand } = require('../controllers/brand.controller')

const brandRouter = express.Router()
brandRouter
    .get("/get", getBrands)
    .post("/add", addBrand)
    .put("/updated/:brandId", editBrand)
    .delete("/delete/:brandId", deleteBrand)

module.exports = brandRouter