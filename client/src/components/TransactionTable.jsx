import { useState } from "react";
import {
  Film,
  ShoppingCart,
  Coffee,
  Home,
  Car,
  Zap,
  Heart,
  Music,
  Book,
  Briefcase,
  Globe,
  Gift,
  CreditCard,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
} from "lucide-react";

// ─── Icon resolver ────────────────────────────────────────────────────────────
const ICON_MAP = {
  Film,
  ShoppingCart,
  Coffee,
  Home,
  Car,
  Zap,
  Heart,
  Music,
  Book,
  Briefcase,
  Globe,
  Gift,
  CreditCard,
};

function CategoryIcon({ iconName, color, size = 14 }) {
  const Icon = ICON_MAP[iconName] || CreditCard;
  return <Icon size={size} color={color} />;
}

// ─── Sample data (remove when wiring to real API) ────────────────────────────
const SAMPLE_DATA = [
  {
    _id: "6a100a4a8e68fac1c5ab00d5",
    userId: "6a1008b16f277bb904c122fc",
    title: "Movie",
    categoryId: { _id: "cat1", title: "Entertainment", icon: "Film", color: "#f59e0b" },
    note: "Watch spiderman brand new day",
    amount: 250,
    date: "2026-05-22T07:48:26.595Z",
    type: "expense",
  },
  {
    _id: "6a100a4a8e68fac1c5ab00d6",
    userId: "6a1008b16f277bb904c122fc",
    title: "Salary",
    categoryId: { _id: "cat2", title: "Income", icon: "Briefcase", color: "#22c55e" },
    note: "Monthly salary",
    amount: 85000,
    date: "2026-05-01T09:00:00.000Z",
    type: "income",
  },
  {
    _id: "6a100a4a8e68fac1c5ab00d7",
    userId: "6a1008b16f277bb904c122fc",
    title: "Groceries",
    categoryId: { _id: "cat3", title: "Food", icon: "ShoppingCart", color: "#3b82f6" },
    note: "Weekly grocery run",
    amount: 1340,
    date: "2026-05-18T14:20:00.000Z",
    type: "expense",
  },
  {
    _id: "6a100a4a8e68fac1c5ab00d8",
    userId: "6a1008b16f277bb904c122fc",
    title: "Electricity Bill",
    categoryId: { _id: "cat4", title: "Utilities", icon: "Zap", color: "#a855f7" },
    note: "May electricity bill",
    amount: 2100,
    date: "2026-05-10T11:00:00.000Z",
    type: "expense",
  },
  {
    _id: "6a100a4a8e68fac1c5ab00d9",
    userId: "6a1008b16f277bb904c122fc",
    title: "Freelance Work",
    categoryId: { _id: "cat5", title: "Income", icon: "Globe", color: "#22c55e" },
    note: "Website project payment",
    amount: 15000,
    date: "2026-05-14T16:45:00.000Z",
    type: "income",
  },
  {
    _id: "6a100a4a8e68fac1c5ab00da",
    userId: "6a1008b16f277bb904c122fc",
    title: "Coffee Subscription",
    categoryId: { _id: "cat6", title: "Food", icon: "Coffee", color: "#3b82f6" },
    note: "Monthly coffee beans",
    amount: 890,
    date: "2026-05-05T08:30:00.000Z",
    type: "expense",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

function formatAmount(amount, type) {
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
  return { formatted, isIncome: type === "income" };
}

// ─── Sort button ──────────────────────────────────────────────────────────────
function SortButton({ label, field, currentSort, onSort }) {
  const active = currentSort?.field === field;
  const dir = active ? currentSort.dir : null;

  return (
    <button
      onClick={() => {
        const nextDir = dir === "asc" ? "desc" : dir === "desc" ? null : "asc";
        onSort(nextDir ? { field, dir: nextDir } : null);
      }}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
        active
          ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300"
          : "bg-white/5 border-white/10 text-white/50 hover:text-white/80 hover:bg-white/10"
      }`}
    >
      {label}
      <span className="opacity-70">
        {dir === "asc" ? (
          <ArrowUp size={12} />
        ) : dir === "desc" ? (
          <ArrowDown size={12} />
        ) : (
          <ArrowUpDown size={12} />
        )}
      </span>
    </button>
  );
}

// ─── Category filter pill ─────────────────────────────────────────────────────
function CategoryPill({ category, selected, onToggle }) {
  return (
    <button
      onClick={() => onToggle(category._id)}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
        selected
          ? "border-white/30 bg-white/15 text-white"
          : "border-white/10 bg-white/5 text-white/50 hover:text-white/80 hover:bg-white/10"
      }`}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: category.color }}
      />
      {category.title}
      {selected && <X size={10} className="ml-0.5 opacity-70" />}
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
/**
 * TransactionTable
 *
 * Props:
 *   transactions  – array from backend (defaults to sample data)
 *   showControls  – bool (default false); shows sort + filter UI
 *   onSortChange  – (sort: { field, dir } | null) => void
 *   onFilterChange– (categoryIds: string[]) => void
 *   isLoading     – bool
 *   emptyMessage  – string
 */
export default function TransactionTable({
  transactions = [],
  showControls = false,
  onSortChange,
  onFilterChange,
  isLoading = false,
  emptyMessage = "No transactions found.",
  categories=[],
  headerSlot
}) {
  const [sort, setSort] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);

  // Derive unique categories from data

  const handleSort = (newSort) => {
    setSort(newSort);
    onSortChange?.(newSort);
  };

  const toggleCategory = (id) => {
    const next = selectedCategories.includes(id)
      ? selectedCategories.filter((c) => c !== id)
      : [...selectedCategories, id];
    setSelectedCategories(next);
    onFilterChange?.(next);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    onFilterChange?.([]);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: "#11141d", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {headerSlot && (
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/5">
          <h2 className="text-white/80 font-semibold text-sm tracking-wide">Transactions</h2>
          <div className="flex items-center gap-2">{headerSlot}</div>
        </div>
      )}
      {/* ── Controls bar ── */}
      {showControls && (
        <div className="px-5 pt-5 pb-3 space-y-3">
          {/* Sort + filter toggle row */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-white/30 text-xs tracking-widest uppercase font-semibold">
                Sort
              </span>
              <SortButton label="Amount" field="amount" currentSort={sort} onSort={handleSort} />
              <SortButton label="Date" field="date" currentSort={sort} onSort={handleSort} />
            </div>

            <button
              onClick={() => setFilterOpen((v) => !v)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                filterOpen || selectedCategories.length > 0
                  ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300"
                  : "bg-white/5 border-white/10 text-white/50 hover:text-white/80 hover:bg-white/10"
              }`}
            >
              <SlidersHorizontal size={12} />
              Filter
              {selectedCategories.length > 0 && (
                <span className="bg-indigo-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                  {selectedCategories.length}
                </span>
              )}
              {filterOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          </div>

          {/* Category filter pills */}
          {filterOpen && (
            <div className="flex items-center gap-2 flex-wrap pt-1 pb-1 border-t border-white/5">
              <span className="text-white/30 text-xs tracking-widest uppercase font-semibold mr-1">
                Category
              </span>
              {categories.map((cat) => (
                <CategoryPill
                  key={cat._id}
                  category={cat}
                  selected={selectedCategories.includes(cat._id)}
                  onToggle={toggleCategory}
                />
              ))}
              {selectedCategories.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-white/30 hover:text-white/60 transition-colors underline underline-offset-2 ml-1"
                >
                  Clear all
                </button>
              )}
            </div>
          )}

          {/* Active filter summary */}
          {selectedCategories.length > 0 && !filterOpen && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {selectedCategories.map((id) => {
                const cat = categories.find((c) => c._id === id);
                if (!cat) return null;
                return (
                  <span
                    key={id}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-white/8 text-white/60 border border-white/10"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    {cat.title}
                  </span>
                );
              })}
            </div>
          )}

          <div className="border-t border-white/5 -mx-5" />
        </div>
      )}

      {/* ── Table ── */}
      <div className="overflow-x-auto">
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
              // Skeleton rows
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  {[1, 2, 3, 4].map((col) => (
                    <td key={col} className="py-4 px-5">
                      <div
                        className="h-4 rounded animate-pulse"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.06)",
                          width: col === 1 ? "60%" : col === 4 ? "40%" : "50%",
                          marginLeft: col === 4 ? "auto" : undefined,
                        }}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-16 text-center text-white/30 text-sm">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              transactions.map((tx, idx) => {
                const { formatted, isIncome } = formatAmount(tx.amount, tx.type);
                const isLast = idx === transactions.length - 1;

                return (
                  <tr
                    key={tx._id}
                    className="group transition-colors duration-150"
                    style={{
                      borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.04)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.025)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    {/* Title */}
                    <td className="py-4 px-5">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-white/90 leading-tight">
                          {tx.title}
                        </span>
                        {tx.note && (
                          <span className="text-xs text-white/30 truncate max-w-[200px]">
                            {tx.note}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-5">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
                        style={{
                          backgroundColor: `${tx.categoryId.color}18`,
                          color: tx.categoryId.color,
                          border: `1px solid ${tx.categoryId.color}30`,
                        }}
                      >
                        <CategoryIcon
                          iconName={tx.categoryId.icon}
                          color={tx.categoryId.color}
                          size={12}
                        />
                        {tx.categoryId.title}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-5">
                      <span className="text-white/50 tabular-nums text-xs">
                        {formatDate(tx.date)}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-5 text-right">
                      <span
                        className={`font-semibold tabular-nums ${
                          isIncome ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {isIncome ? "+" : "-"}
                        {formatted}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
