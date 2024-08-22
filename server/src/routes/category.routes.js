const express = require('express')
const { getCategories, addCategory, editCategory, deleteCategory } = require('../controllers/category.controller')
const { authMiddleware, isAdmin } = require('../middlewares/auth.middleware')
const categoryRouter = express.Router()
categoryRouter
    .get("/get", getCategories)
    .post("/add",authMiddleware,isAdmin, addCategory)
    .put("/updated/:categoryId",authMiddleware,isAdmin, editCategory)
    .delete("/delete/:categoryId",authMiddleware,isAdmin, deleteCategory)

module.exports = categoryRouter