import { ChevronRight, MoveRight, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import Card from "../components/Card";
import Header from "../components/Header";
import Section from "../components/Section";
import { useUser } from "../contexts/UserContextProvider"
import { useEffect, useState } from "react";
import { getExpenseStats, getStats } from "../services/dashboard.service";
import ExpenseChart from "../components/ExpenseChart";
import { TransactionTable } from "../components/TransactionTable";
import Table from "../components/Table";
import { Link } from "react-router-dom";

function Dashboard() {
    const { user, loading,token } = useUser();
    const [monthStats,setMonthStats]=useState({
        totalIncome:0,
        totalExpense:0,
        balance:0,
        recentTransaction:[]
    })

    const [expenseBreakdown,setExpenseBreakdown]=useState([]);

    const getMonthStats=async () => {
        try {
           const response= await getStats(token);
           console.log(response.data)
           setMonthStats(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getChartStats=async () => {
        try {
            const response=await getExpenseStats(token)
            console.log(response)
            setExpenseBreakdown(response.data.breakdown)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(token){
            getMonthStats()
            getChartStats()
        }
    },[user])
    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <>
            <Header firstName={user?.firstName} />
            <Section>
                <h3 className="text-gray-400 mb-2">This Month</h3>
                <div className="flex gap-3">
                    <Card cardStyle='w-1/3 shadow-green-500/20' title='Income' color="text-green-500" amount={monthStats.totalIncome} icon={TrendingUp} iconBg="bg-green-500/20"></Card>
                    <Card cardStyle='w-1/3 shadow-red-500/20' title='Expense' color="text-red-500" amount={monthStats.totalExpense} icon={TrendingDown} iconBg="bg-red-500/20"></Card>
                    <Card cardStyle='w-1/3 shadow-primary/20' title='Balance' color="text-primary" amount={monthStats.balance} icon={Wallet} iconBg="bg-primary/20"></Card>
                </div>
            </Section>

            <Section>
                <ExpenseChart breakdown={expenseBreakdown} />
            </Section>

            <Section>
                <div className="flex justify-between">
                <h3 className="text-gray-400 mb-2">Recent Transactions</h3>
                <Link to='/transaction' className="text-primary mb-2 border px-4 py-1 border-solid border-primary hover:bg-primary hover:text-black cursor-pointer flex rounded-md items-center">View All
                    <ChevronRight />
                </Link>
                </div>

                <Table
  transactions={monthStats?.recentTransactions ?? []}
/>
            </Section>
        </>
    )
}

export default Dashboard