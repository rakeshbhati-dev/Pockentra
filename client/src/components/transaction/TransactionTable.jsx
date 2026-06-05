import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionCard from "./TransactionCard";
import TransactionFilterBar from "./TransactionFilterBar";
import TransactionSkeleton from "./TransactionSkeleton";
import TransactionDesktopTable from "./TransactionDesktopTable";

export default function TransactionTable({
  transactions = [],
  showControls = false,
  onSortChange,
  onFilterChange,
  isLoading = false,
  emptyMessage = "No transactions found.",
  categories = [],
  headerSlot,
  selectedTxId = null,
  onRowClick,
}) {
  const [sort, setSort] = useState(null);
  const navigate = useNavigate();

  const isMobile = window.innerWidth < 640;

  const handleRowClick = (tx) => {
    if (isMobile) {
      navigate(`/transaction/${tx._id}`);
    } else {
      onRowClick?.(tx);
    }
  };

  const handleSort = (newSort) => {
    setSort(newSort);
    onSortChange?.(newSort);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: "#11141d", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Header slot */}
      {headerSlot && (
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/5">
          <h2 className="text-white/80 font-semibold text-sm tracking-wide">Transactions</h2>
          <div className="flex items-center gap-2">{headerSlot}</div>
        </div>
      )}

      {/* Sort + filter controls */}
      {showControls && (
        <TransactionFilterBar
          categories={categories}
          sort={sort}
          onSort={handleSort}
          onFilterChange={onFilterChange}
        />
      )}

      {/* Desktop table */}
      <TransactionDesktopTable
        transactions={transactions}
        isLoading={isLoading}
        emptyMessage={emptyMessage}
        selectedTxId={selectedTxId}
        onRowClick={handleRowClick}
      />

      {/* Mobile card list */}
      <div className="sm:hidden">
        {isLoading ? (
          <TransactionSkeleton variant="mobile" />
        ) : transactions.length === 0 ? (
          <p className="py-16 text-center text-white/30 text-sm">{emptyMessage}</p>
        ) : (
          transactions.map((tx) => (
            <TransactionCard
              key={tx._id}
              tx={tx}
              isSelected={selectedTxId === tx._id}
              onRowClick={handleRowClick}
            />
          ))
        )}
      </div>
    </div>
  );
}
