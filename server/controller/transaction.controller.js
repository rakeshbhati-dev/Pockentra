const Transaction = require('../models/transaction.model');
const Category = require('../models/category.model');

const createTransaction = async (req, res) => {
    try {
        const { userId } = req.user;
        const { categoryId, title, note, amount, date, type } = req.body;

        const categoryExist = await Category.findById(categoryId);
        if (!categoryExist) {
            return res.status(404).json({ message: "Provided category does not exist" });
        }

        const response = await Transaction.create({ userId, categoryId, amount, date, note, title, type });
        return res.status(201).json({ message: "Transaction created successfully", data: response })


    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

const getParticularTransaction = async (req, res) => {
    try {
        const { userId } = req.user
        const { id } = req.params

        const response = await Transaction.findById(id).populate('categoryId', 'title color icon');
        if (!response) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        return res.status(200).json({ message: "Transaction found successfully", data: response });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

const getParticularUserTransaction = async (req, res) => {
    try {
        const { userId } = req.user;
        const {
            month,
            year,
            page = 1,
            limit = 10,
            sortBy = "date",
            order = "desc",
            categories
        } = req.query

        const query = { userId }

        if (month && year) {
            const startDate = new Date(Number(year), Number(month) - 1, 1);
            const endDate = new Date(Number(year), Number(month), 1)
            query.date = { $gte: startDate, $lt: endDate };
        }

        else if (year) {

            const startDate = new Date(Number(year), 0, 1)

            const endDate = new Date(Number(year) + 1, 0, 1)

            query.date = {
                $gte: startDate,
                $lt: endDate
            }
        }

        if (categories) {
            const categoryArray = categories.split(",")
            query.categoryId = {
                $in: categoryArray
            }
        }

        const sortOptions = {}
        sortOptions[sortBy] = order === "asc" ? 1 : -1

        const currentPage = Number(page);
        const currentLimit = Number(limit)
        const skip = (currentPage - 1) * currentLimit;

        const response = await Transaction.find(query).populate('categoryId', 'title color icon').sort(sortOptions).skip(skip).limit(currentLimit)
        return res.status(200).json({ message: "Transaction fetch successfully", data: response })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

const updateTransaction = async (req, res) => {
    try {
        const { userId } = req.user;
        const { id } = req.params;

        const { categoryId, title, note, amount, date, type } = req.body;

        if(categoryId){
            const categoryExist = await Category.findById(categoryId);
        if (!categoryExist) {
            return res.status(404).json({ message: "Provided category does not exist" });
        }
        }

        const response = await Transaction.findByIdAndUpdate(id, { categoryId, title, note, amount, date, type }, { new: true });
        return res.status(200).json({ message: "Transaction updated successfully", data: response })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

const deleteParticularTransaction = async (req,res) => {
    try {
        const {userId}=req.user;
        const {id}=req.params;

        const response = await Transaction.findByIdAndDelete(id);
        return res.status(200).json({message:"Transaction deleted successfully"});
    } catch (error) {
         return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

module.exports = { createTransaction, getParticularTransaction, getParticularUserTransaction, updateTransaction, deleteParticularTransaction }