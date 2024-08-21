const express = require('express')
const { getCategories, addCategory, editCategory, deleteCategory } = require('../controllers/category.controller')

const categoryRouter = express.Router()
categoryRouter
    .get("/get", getCategories)
    .post("/add", addCategory)
    .put("/updated/:categoryId", editCategory)
    .delete("/delete/:categoryId", deleteCategory)

module.exports = categoryRouter