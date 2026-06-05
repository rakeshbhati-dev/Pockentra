import TransactionRow from "./TransactionRow";
import TransactionSkeleton from "./TransactionSkeleton";

export default function TransactionDesktopTable({
  transactions = [],
  isLoading = false,
  emptyMessage = "No transactions found.",
  selectedTxId = null,
  onRowClick,
}) {
  return (
    <div className="hidden sm:block overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {["Title", "Category", "Date", "Amount"].map((h) => (
              <th
                key={h}
                className={`py-4 px-5 text-left text-xs font-semibold tracking-widest uppercase text-white/30 ${
                  h === "Amount" ? "text-right" : ""
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <TransactionSkeleton variant="desktop" />
          ) : transactions.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-16 text-center text-white/30 text-sm">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            transactions.map((tx, idx) => (
              <TransactionRow
                key={tx._id}
                tx={tx}
                isSelected={selectedTxId === tx._id}
                isLast={idx === transactions.length - 1}
                onRowClick={onRowClick}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
