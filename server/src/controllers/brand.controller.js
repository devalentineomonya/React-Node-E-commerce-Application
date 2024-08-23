const { isValidObjectId } = require('mongoose')
const BrandModel = require('../models/brand.model')


const getBrands = async (_, res) => {
    try {
        const brands = await BrandModel.find()
        res.status(200).json({ success: true, data: brands })
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while fetching products" })

    }

}
const addBrand = async (req, res) => {
    const { name, description, logoUrl,productImage, website } = req.body
    try {
        const isDuplicate = await BrandModel.findOne({ name })
        if (isDuplicate) return res.status(400).json({ success: false, message: "Brand with the same name already exists" })

        const newBrand = new BrandModel({ name, description, logoUrl,productImage, website })
        await newBrand.save()
        res.status(201).json({ success: true, message: "New brand has been added successfully" })

    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while adding product" })
    }
}

const editBrand = async (req, res) => {
    const { brandId } = req.params
    try {
        const isValidId = isValidObjectId(brandId)
        if (!isValidId) return res.status(404).json({ success: false, message: "Brand with the specified id was not found" })

        const { name, description, logoUrl,productImage, website } = req.body
        const isDuplicate = await BrandModel.findOne({ name, _id: { $ne: brandId } })
        if (isDuplicate) return res.status(400).json({ success: false, message: "Brand with the same id already exists." });
        await BrandModel.findOneAndUpdate(brandId, { name, description, logoUrl,productImage, website })
        res.status(200).json({ success: true, message: "Brand has been updated successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while updating product" })
    }


}

const deleteBrand = async (req, res) => {
    const { brandId } = req.params
    try {
        const isValidId = isValidObjectId(brandId)
        if (!isValidId) return res.status(404).json({ success: false, message: "Brand with the specified id was not found" })
        await BrandModel.findOneAndDelete(brandId)
        res.status(200).json({ success: true, message: "Brand has been deleted successfully" })
    } catch {
        res.status(500).json({ success: false, message: "An error occurred while updating product" })
    }

}

module.exports = {getBrands, addBrand, editBrand, deleteBrand}