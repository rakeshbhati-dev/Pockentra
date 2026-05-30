import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useUser } from "../contexts/UserContextProvider";
import { getAllTransaction } from "../services/transaction.service";
import Section from "../components/Section";
import { getAllCategories } from "../services/category.service";
import TransactionTable from "../components/TransactionTable";
import { ChevronDown } from "lucide-react";

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1; // 1-indexed to match backend
const currentYear = currentDate.getFullYear();

// Generate years from 2020 up to current year
const YEARS = Array.from(
    { length: currentYear - 2020 + 1 },
    (_, i) => 2020 + i
);

function Transaction() {
    const { user, token } = useUser();
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const [queryParams, setQueryParams] = useState({
        sortBy: "date",
        order: "desc",
        categories: "",
        month: currentMonth,
        year: currentYear,
        page: 1,
        limit: 10,
    });

    const getTransactionList = async (params) => {
        try {
            setIsLoading(true);
            const query = new URLSearchParams();
            Object.entries(params).forEach(([key, val]) => {
                if (val !== "" && val !== null && val !== undefined) {
                    query.set(key, val);
                }
            });
            const response = await getAllTransaction(token, query.toString());
            setTransactions(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getCategoriesList = async () => {
        try {
            const response = await getAllCategories(token);
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTransactionList(queryParams);
    }, [queryParams]);

    useEffect(() => {
        getCategoriesList();
    }, []);

    const handleSortChange = (sort) => {
        setQueryParams((prev) => ({
            ...prev,
            sortBy: sort?.field ?? "date",
            order: sort?.dir ?? "desc",
            page: 1,
        }));
    };

    const handleFilterChange = (categoryIds) => {
        setQueryParams((prev) => ({
            ...prev,
            categories: categoryIds.join(","),
            page: 1,
        }));
    };

    const handleMonthChange = (e) => {
        const month = Number(e.target.value);
        setSelectedMonth(month);
        setQueryParams((prev) => ({
            ...prev,
            month,
            page: 1,
        }));
    };

    const handleYearChange = (e) => {
        const year = Number(e.target.value);
        setSelectedYear(year);

        // If selected year is current year and chosen month is in the future, clamp to current month
        const clampedMonth =
            year === currentYear && selectedMonth > currentMonth
                ? currentMonth
                : selectedMonth;

        setSelectedMonth(clampedMonth);
        setQueryParams((prev) => ({
            ...prev,
            year,
            month: clampedMonth,
            page: 1,
        }));
    };

    // Months available depend on selected year — future months are disabled
    const isMonthDisabled = (monthIndex) => {
        // monthIndex is 1-indexed
        return selectedYear === currentYear && monthIndex > currentMonth;
    };

    // Shared select style
const selectClass =
    "appearance-none bg-[#11141d] text-white/80 text-sm border border-white/10 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-primary cursor-pointer";

return (
    <>
        <Header firstName={user?.firstName} />
        <Section>
            <TransactionTable
                transactions={transactions}
                categories={categories ?? []}
                showControls={true}
                isLoading={isLoading}
                onSortChange={handleSortChange}
                onFilterChange={handleFilterChange}
                headerSlot={
                    <>
                        {/* Month */}
                        <div className="relative">
                            <select
                                value={selectedMonth}
                                onChange={handleMonthChange}
                                className={selectClass}
                            >
                                {MONTHS.map((name, i) => {
                                    const monthNum = i + 1;
                                    return (
                                        <option
                                            key={monthNum}
                                            value={monthNum}
                                            disabled={isMonthDisabled(monthNum)}
                                        >
                                            {name}
                                        </option>
                                    );
                                })}
                            </select>
                            <ChevronDown
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
                                size={13}
                            />
                        </div>

                        {/* Year */}
                        <div className="relative">
                            <select
                                value={selectedYear}
                                onChange={handleYearChange}
                                className={selectClass}
                            >
                                {YEARS.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
                                size={13}
                            />
                        </div>
                    </>
                }
            />
        </Section>
    </>
);
}

export default Transaction;