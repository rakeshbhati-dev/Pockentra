const Transaction=require('../models/transaction.model');

const getStats= async (req,res) => {
    try {
        const {userId}=req.user;

        const currentDate= new Date();
        const startDate= new Date(currentDate.getFullYear(),currentDate.getMonth(),1);
        const endDate= new Date(currentDate.getFullYear(),currentDate.getMonth()+1,1);

        const transactionList= await Transaction.find({userId,date:{$gte:startDate,$lt:endDate}});

        let totalIncome=0;
        let totalExpense=0;
        transactionList.forEach((trans)=>{
            if(trans.type==='income') totalIncome+=trans.amount;
            else{
                totalExpense+=trans.amount
            }
        })

        const balance=totalIncome-totalExpense;
        const response={
            totalIncome,totalExpense,balance
        }

        return res.status(200).json({message:"Dashboard stats fetch successfully",data:response})
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

module.exports={getStats}