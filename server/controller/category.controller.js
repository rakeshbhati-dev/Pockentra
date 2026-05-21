const Category = require('../models/category.model');
const User = require('../models/user.model');

const createCategory = async (req, res) => {
    try {
        const { userId } = req.user;
        const { title, icon, color } = req.body;

        const response = await Category.create({ userId, title, icon, color });
        return res.status(201).json({ message: "Category Created Successfully", data: response })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Category already exists",
                error: error.message
            })
        }
        else {
            return res.status(500).json({
                message: "Something went wrong",
                error: error.message
            })
        }
    }
}

const getAllCategory = async (req, res) => {
    try {
        const { userId } = req.user;

        const response = await Category.find({
            $or: [
                { isDefault: true },
                { userId: userId }
            ]
        })

        return res.status(200).json({ message: "Category fetched successfully", data: response })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

const deleteParticularCategory = async (req, res) => {
    try {
        const { userId } = req.user;
        const { categoryId } = req.params
        const response = await Category.findOneAndDelete({ userId: userId, _id: categoryId })
        if (!response) {
            return res.status(404).json({ message: "No Category Found" });
        }
        return res.status(200).json({ message: "Category deleted successfully." })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

module.exports = { createCategory, getAllCategory }