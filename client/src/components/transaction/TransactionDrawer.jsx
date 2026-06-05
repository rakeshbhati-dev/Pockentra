import { useEffect } from "react";
import {
  X, Pencil, Trash2, CreditCard,
  Film, ShoppingCart, Coffee, Home, Car, Zap,
  Heart, Music, Book, Briefcase, Globe, Gift,
} from "lucide-react";
import { formatAmount, formatDate, formatTime } from "../../utils/formatters";

const ICON_MAP = {
  Film, ShoppingCart, Coffee, Home, Car, Zap,
  Heart, Music, Book, Briefcase, Globe, Gift, CreditCard,
};

function CategoryIcon({ iconName, color, size = 18 }) {
  const Icon = ICON_MAP[iconName] || CreditCard;
  return <Icon size={size} color={color} />;
}

export default function TransactionDrawer({ transaction, onClose, onEdit, onDelete }) {
  const isOpen = !!transaction;

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const isIncome = transaction?.type === "income";
  const { color, icon, title: catTitle } = transaction?.categoryId ?? {};

  return (
    <>
      {/* Backdrop — clicking outside closes drawer */}
      <div
        className="fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          background: "transparent",
        }}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className="fixed top-0 right-0 h-full z-40 flex flex-col"
        style={{
          width: "360px",
          backgroundColor: "#0d1018",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: isOpen ? "-8px 0 32px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="text-white/50 text-xs tracking-widest uppercase font-semibold">
            Transaction detail
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/30 hover:text-white/80 hover:bg-white/8 transition-all duration-150"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
          {transaction && (
            <>
              {/* Amount hero */}
              <div className="text-center py-4">
                <p className="text-white/30 text-xs mb-2 tracking-wide uppercase">
                  {isIncome ? "Income" : "Expense"}
                </p>
                <p
                  className={`text-4xl font-bold tabular-nums ${
                    isIncome ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {isIncome ? "+" : "−"}{formatAmount(transaction.amount)}
                </p>
              </div>

              {/* Category badge */}
              <div className="flex justify-center">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
                  style={{
                    backgroundColor: `${color}18`,
                    color,
                    border: `1px solid ${color}30`,
                  }}
                >
                  <CategoryIcon iconName={icon} color={color} size={15} />
                  {catTitle}
                </span>
              </div>

              {/* Divider */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }} />

              {/* Detail rows */}
              <div className="space-y-4">
                <DetailRow label="Title" value={transaction.title} />
                <DetailRow label="Date" value={formatDate(transaction.date)} />
                <DetailRow label="Time" value={formatTime(transaction.date)} />
                {transaction.note && (
                  <DetailRow label="Note" value={transaction.note} />
                )}
                <DetailRow
                  label="Type"
                  value={
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        isIncome
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                          : "bg-red-500/15 text-red-400 border border-red-500/20"
                      }`}
                    >
                      {isIncome ? "Income" : "Expense"}
                    </span>
                  }
                />
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        <div
          className="px-5 py-4 flex gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <button
            onClick={() => onDelete?.(transaction)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-red-400 border border-red-500/20 bg-red-500/8 hover:bg-red-500/15 transition-all duration-150"
          >
            <Trash2 size={14} />
            Delete
          </button>
          <button
            onClick={() => onEdit?.(transaction)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-indigo-300 border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 transition-all duration-150"
          >
            <Pencil size={14} />
            Edit
          </button>
        </div>
      </div>
    </>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-white/30 text-xs uppercase tracking-widest font-semibold shrink-0 mt-0.5">
        {label}
      </span>
      <span className="text-white/80 text-sm text-right leading-relaxed">
        {value}
      </span>
    </div>
  );
}
