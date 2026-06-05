import CategoryIcon from "./CategoryIcon";
import { formatDate, formatAmount } from "../../utils/formatters";

export default function TransactionRow({ tx, isSelected, isLast, onRowClick }) {
  // const { formatted, isIncome } = formatAmount(tx.amount, tx.type);
  const isIncome = tx?.type === "income";
  const formatted=formatAmount(tx.amount)

  return (
    <tr
      onClick={() => onRowClick(tx)}
      className={`group transition-colors duration-150 cursor-pointer ${isSelected ? "bg-indigo-500/10" : ""}`}
      style={{
        borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.04)",
        borderLeft: isSelected ? "2px solid rgba(99,102,241,0.6)" : "2px solid transparent",
      }}
      onMouseEnter={(e) => {
        if (!isSelected) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.025)";
      }}
      onMouseLeave={(e) => {
        if (!isSelected) e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {/* Title + note */}
      <td className="py-4 px-5">
        <div className="flex flex-col gap-0.5">
          <span className="font-medium text-white/90 leading-tight">{tx.title}</span>
          {tx.note && (
            <span className="text-xs text-white/30 truncate max-w-[200px]">{tx.note}</span>
          )}
        </div>
      </td>

      {/* Category badge */}
      <td className="py-4 px-5">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
          style={{
            backgroundColor: `${tx.categoryId.color}18`,
            color: tx.categoryId.color,
            border: `1px solid ${tx.categoryId.color}30`,
          }}
        >
          <CategoryIcon iconName={tx.categoryId.icon} color={tx.categoryId.color} size={12} />
          {tx.categoryId.title}
        </span>
      </td>

      {/* Date */}
      <td className="py-4 px-5">
        <span className="text-white/50 tabular-nums text-xs">{formatDate(tx.date)}</span>
      </td>

      {/* Amount */}
      <td className="py-4 px-5 text-right">
        <span className={`font-semibold tabular-nums ${isIncome ? "text-emerald-400" : "text-red-400"}`}>
          {isIncome ? "+" : "-"}{formatted}
        </span>
      </td>
    </tr>
  );
}
