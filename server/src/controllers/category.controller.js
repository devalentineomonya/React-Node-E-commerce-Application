const { isValidObjectId } = require('mongoose')
const CategoryModel = require('../models/category.model')


const getCategories = async (_, res) => {
    try {
        const category = await CategoryModel.find()
        res.status(200).json({ success: true, data: category })
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while fetching categories" })

    }

}
const addCategory = async (req, res) => {
    const { name, description, imageUrl } = req.body
    try {
        const isDuplicate = await CategoryModel.findOne({ name })
        if (isDuplicate) return res.status(400).json({ success: false, message: "Category with the same name already exists" })

        const newCategory = new CategoryModel({ name, description, imageUrl })
        await newCategory.save()
        res.status(201).json({ success: true, message: "New category has been added successfully" })

    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while adding category" })
    }
}

const editCategory = async (req, res) => {
    const { categoryId } = req.params
    try {
        const isValidId = isValidObjectId(categoryId)
        if (!isValidId) return res.status(404).json({ success: false, message: "Category with the specified id was not found" })

        const { name, description, imageUrl } = req.body
        const isDuplicate = await CategoryModel.findOne({ name, _id: { $ne: categoryId } })
        if (isDuplicate) return res.status(400).json({ success: false, message: "Category with the same id already exists." });
        const updatedCategory = await CategoryModel.findOneAndUpdate(categoryId, { name, description, imageUrl })

        if (!updatedCategory) return res.status(404).json({ success: false, message: "Category with the specified id was not found" })

        res.status(200).json({ success: true, message: "Category has been updated successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while updating category" })
    }


}

const deleteCategory = async (req, res) => {
    const { categoryId } = req.params
    try {
        const isValidId = isValidObjectId(categoryId)
        if (!isValidId) return res.status(404).json({ success: false, message: "Category with the specified id was not found" })
        const deletedCategory = await CategoryModel.findOneAndDelete(categoryId)
        if (!deletedCategory) return res.status(404).json({ success: false, message: "Category with the specified id was not found" })
        res.status(200).json({ success: true, message: "Category has been deleted successfully" })
    } catch {
        res.status(500).json({ success: false, message: "An error occurred while updating category" })
    }

}

module.exports = { getCategories, addCategory, editCategory, deleteCategory }