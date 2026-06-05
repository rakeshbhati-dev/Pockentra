import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { useUser } from "../contexts/UserContextProvider";
import { getAllTransaction } from "../services/transaction.service";
import Section from "../components/Section";
import { getAllCategories } from "../services/category.service";
import TransactionTable from "../components/transaction/TransactionTable";
import DeleteTransactionModal from "../components/transaction/DeleteTransactionModal";
import { deleteTransaction } from "../services/transaction.service";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TransactionDrawer from "../components/transaction/TransactionDrawer";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

const YEARS = Array.from(
  { length: currentYear - 2020 + 1 },
  (_, i) => 2020 + i
);

function TransactionList() {
  const { user, token } = useUser();
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const navigate=useNavigate()

  // Drawer state
  const [selectedTx, setSelectedTx] = useState(null);

  // Delete modal state
  const [txToDelete, setTxToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
        if (val !== "" && val !== null && val !== undefined) query.set(key, val);
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

  useEffect(() => { getTransactionList(queryParams); }, [queryParams]);
  useEffect(() => { getCategoriesList(); }, []);

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
    setQueryParams((prev) => ({ ...prev, month, page: 1 }));
  };

  const handleYearChange = (e) => {
    const year = Number(e.target.value);
    setSelectedYear(year);
    const clampedMonth =
      year === currentYear && selectedMonth > currentMonth ? currentMonth : selectedMonth;
    setSelectedMonth(clampedMonth);
    setQueryParams((prev) => ({ ...prev, year, month: clampedMonth, page: 1 }));
  };

  const isMonthDisabled = (monthIndex) =>
    selectedYear === currentYear && monthIndex > currentMonth;

  // Drawer handlers
  const handleRowClick = (tx) => {
    setSelectedTx((prev) => (prev?._id === tx._id ? null : tx));
  };

  const handleDrawerClose = () => setSelectedTx(null);

  const handleEdit = (tx) => {
    navigate(`/transaction/update/${tx._id}`);
  };

  const handleDelete = (tx) => {
    setTxToDelete(tx);
  };

  const handleDeleteConfirm = async (tx) => {
    try {
      setIsDeleting(true);
      await deleteTransaction(token, tx._id);
      setTxToDelete(null);
      setSelectedTx(null);
      getTransactionList(queryParams);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteClose = () => {
    if (!isDeleting) setTxToDelete(null);
  };

  const selectClass =
    "appearance-none bg-[#11141d] text-white/80 text-sm border border-white/10 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-primary cursor-pointer";

  return (
    <>
      <Header />
        {/*
          Layout wrapper: when drawer is open the table shrinks left,
          the drawer slides in from the right — both live in the same flex row.
        */}
        <div className="flex  transition-all duration-300 relative">
          {/* Table — shrinks when drawer is open */}
          <div
            className="transition-all duration-300 min-w-0"
            style={{ flex: selectedTx ? "1 1 0%" : "1 1 100%" }}
          >
            <TransactionTable
              transactions={transactions}
              categories={categories ?? []}
              showControls={true}
              isLoading={isLoading}
              onSortChange={handleSortChange}
              onFilterChange={handleFilterChange}
              selectedTxId={selectedTx?._id ?? null}
              onRowClick={handleRowClick}
              headerSlot={
                <>
                  {/* Month */}
                  <div className="relative">
                    <select value={selectedMonth} onChange={handleMonthChange} className={selectClass}>
                      {MONTHS.map((name, i) => {
                        const monthNum = i + 1;
                        return (
                          <option key={monthNum} value={monthNum} disabled={isMonthDisabled(monthNum)}>
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
                    <select value={selectedYear} onChange={handleYearChange} className={selectClass}>
                      {YEARS.map((year) => (
                        <option key={year} value={year}>{year}</option>
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
          </div>

          {/* Drawer — inline, slides in to the right of the table */}
          <div
            className="transition-all duration-300 overflow-hidden shrink-0"
            style={{
              width: selectedTx ? "360px" : "0px",
              opacity: selectedTx ? 1 : 0,
            }}
          >
            <div style={{ width: "360px" }}>
              <TransactionDrawer
                transaction={selectedTx}
                onClose={handleDrawerClose}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>

      <DeleteTransactionModal
        transaction={txToDelete}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onClose={handleDeleteClose}
      />
    </>
  );
}

export default TransactionList;
