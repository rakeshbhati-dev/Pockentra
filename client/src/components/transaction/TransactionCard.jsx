import { CreditCard } from "lucide-react";
import {
  Film, ShoppingCart, Coffee, Home, Car, Zap, Heart,
  Music, Book, Briefcase, Globe, Gift,
} from "lucide-react";
import { formatAmount, formatDate } from "../../utils/formatters";

const ICON_MAP = {
  Film, ShoppingCart, Coffee, Home, Car, Zap, Heart,
  Music, Book, Briefcase, Globe, Gift, CreditCard,
};

function CategoryIcon({ iconName, color, size = 11 }) {
  const Icon = ICON_MAP[iconName] || CreditCard;
  return <Icon size={size} color={color} />;
}



/**
 * TransactionCard
 *
 * Props:
 *   tx          – transaction object
 *   isSelected  – bool
 *   onRowClick  – (tx) => void
 */
export default function TransactionCard({ tx, isSelected = false, onRowClick }) {
  const { formatted, isIncome } = formatAmount(tx.amount, tx.type);

  return (
    <div
      onClick={() => onRowClick?.(tx)}
      className={`px-4 py-3.5 cursor-pointer transition-colors duration-150 ${isSelected ? "bg-indigo-500/10" : "active:bg-white/5"}`}
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        borderLeft: isSelected ? "2px solid rgba(99,102,241,0.6)" : "2px solid transparent",
      }}
    >
      {/* Row 1: title + amount */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-white/90 text-sm leading-tight truncate">{tx.title}</p>
          {tx.note && (
            <p className="text-xs text-white/30 truncate mt-0.5">{tx.note}</p>
          )}
        </div>
        <span className={`font-semibold tabular-nums text-sm flex-shrink-0 ${isIncome ? "text-emerald-400" : "text-red-400"}`}>
          {isIncome ? "+" : "-"}{formatted}
        </span>
      </div>

      {/* Row 2: category pill + date */}
      <div className="flex items-center justify-between mt-2">
        <span
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-xs font-medium"
          style={{
            backgroundColor: `${tx.categoryId.color}18`,
            color: tx.categoryId.color,
            border: `1px solid ${tx.categoryId.color}30`,
          }}
        >
          <CategoryIcon iconName={tx.categoryId.icon} color={tx.categoryId.color} />
          {tx.categoryId.title}
        </span>
        <span className="text-white/40 text-xs tabular-nums">{formatDate(tx.date)}</span>
      </div>
    </div>
  );
}
