import { ChevronRight, MoveRight, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import Card from "../components/dashboard/Card";
import Header from "../components/header/Header";
import Section from "../components/Section";
import { useUser } from "../contexts/UserContextProvider"
import { useEffect, useState } from "react";
import { getExpenseStats, getStats } from "../services/dashboard.service";
import ExpenseChart from "../components/dashboard/ExpenseChart";
import TransactionTable from "../components/TransactionTable";
import { Link } from "react-router-dom";

function Dashboard() {
    const { user, loading, token } = useUser();
    const [monthStats, setMonthStats] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        recentTransaction: []
    })

    const [expenseBreakdown, setExpenseBreakdown] = useState([]);

    const getMonthStats = async () => {
        try {
            const response = await getStats(token);
            setMonthStats(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getChartStats = async () => {
        try {
            const response = await getExpenseStats(token)
            setExpenseBreakdown(response.data.breakdown)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (token) {
            getMonthStats()
            getChartStats()
        }
    }, [user])
    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <>
            <Header />
            <Section>
                <h3 className="text-gray-400 mb-2">This Month</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Card cardStyle="shadow-green-500/20" title="Income" color="text-green-500" amount={monthStats.totalIncome} icon={TrendingUp} iconBg="bg-green-500/20" />
                    <Card cardStyle="shadow-red-500/20" title="Expense" color="text-red-500" amount={monthStats.totalExpense} icon={TrendingDown} iconBg="bg-red-500/20" />
                    <Card cardStyle="shadow-primary/20" title="Balance" color="text-primary" amount={monthStats.balance} icon={Wallet} iconBg="bg-primary/20" />
                </div>
            </Section>

            <Section>
                <ExpenseChart breakdown={expenseBreakdown} />
            </Section>

            <Section>
                <div className="flex justify-between items-center gap-2 sm:gap-4 mb-4">
                    <h3 className="text-sm sm:text-base md:text-lg text-gray-400">
                        Recent Transactions
                    </h3>

                    <Link
                        to="/transaction"
                        className="text-xs sm:text-sm md:text-base text-primary border border-primary px-2 py-1 sm:px-4 sm:py-1.5 rounded-md flex items-center gap-1 hover:bg-primary hover:text-black"
                    >
                        <span>View All</span>
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                </div>

                <TransactionTable
                    transactions={monthStats?.recentTransactions ?? []}
                />
            </Section>
        </>
    )
}

export default Dashboard