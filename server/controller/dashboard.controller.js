const Transaction = require('../models/transaction.model');

const getStats = async (req, res) => {
    try {
        const { userId } = req.user;

        const currentDate = new Date();
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

        const transactionList = await Transaction.find({ userId, date: { $gte: startDate, $lt: endDate } });

        let totalIncome = 0;
        let totalExpense = 0;
        transactionList.forEach((trans) => {
            if (trans.type === 'income') totalIncome += trans.amount;
            else {
                totalExpense += trans.amount
            }
        })

        const balance = totalIncome - totalExpense;
        const response = {
            totalIncome, totalExpense, balance
        }

        return res.status(200).json({ message: "Dashboard stats fetch successfully", data: response })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

const getExpenseBreakdown = async (
    req,
    res
) => {

    try {

        const { userId } = req.user;

        const currentDate = new Date()

        const startDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        )

        const endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            1
        )

        const transactionList =
            await Transaction.find({
                userId,
                type: "expense",
                date: {
                    $gte: startDate,
                    $lt: endDate
                }
            }).populate(
                "categoryId",
                "title color icon"
            )

        const categoryMap = {}

        let totalExpense = 0

        transactionList.forEach(
            (transaction) => {

                const category =
                    transaction.categoryId

                const categoryId =
                    category._id.toString()

                totalExpense +=
                    transaction.amount

                if (!categoryMap[categoryId]) {

                    categoryMap[categoryId] = {

                        categoryId,

                        title: category.title,

                        color: category.color,

                        icon: category.icon,

                        amount: 0
                    }
                }

                categoryMap[categoryId]
                    .amount += transaction.amount
            }
        )

        const breakdown =
            Object.values(categoryMap)

        breakdown.forEach((item) => {

            item.percentage = Number(
                (
                    (item.amount / totalExpense)
                    * 100
                ).toFixed(1)
            )
        })

        return res.status(200).json({

            message: "Expense data fetch successfully",
            data: {
                totalExpense,
                breakdown
            }
        })

    } catch (error) {

        return res.status(500).json({
            message:"Something went wrong",
            error: error.message
        })
    }
}

module.exports = { getStats, getExpenseBreakdown }