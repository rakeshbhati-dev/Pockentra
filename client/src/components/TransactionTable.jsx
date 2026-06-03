import { useState } from "react";
import {
  Film, ShoppingCart, Coffee, Home, Car, Zap, Heart,
  Music, Book, Briefcase, Globe, Gift, CreditCard,
  ArrowUpDown, ArrowUp, ArrowDown,
  X, ChevronDown, ChevronUp, SlidersHorizontal,
} from "lucide-react";
import TransactionCard from "./TransactionCard";
import { useNavigate } from "react-router-dom";

const ICON_MAP = {
  Film, ShoppingCart, Coffee, Home, Car, Zap, Heart,
  Music, Book, Briefcase, Globe, Gift, CreditCard,
};

function CategoryIcon({ iconName, color, size = 14 }) {
  const Icon = ICON_MAP[iconName] || CreditCard;
  return <Icon size={size} color={color} />;
}



function formatDate(iso) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  }).format(new Date(iso));
}

function formatAmount(amount, type) {
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(amount);
  return { formatted, isIncome: type === "income" };
}

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
        {dir === "asc" ? <ArrowUp size={12} /> : dir === "desc" ? <ArrowDown size={12} /> : <ArrowUpDown size={12} />}
      </span>
    </button>
  );
}

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
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: category.color }} />
      {category.title}
      {selected && <X size={10} className="ml-0.5 opacity-70" />}
    </button>
  );
}

export default function ResponsiveTable({
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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate=useNavigate();

  const isMobile = window.innerWidth < 640; // or use a useMediaQuery hook

const handleRowClick = (tx) => {
  if (isMobile) {
    navigate(`/transaction/${tx._id}`);
  } else {
    onRowClick?.(tx); // opens drawer on desktop
  }
};

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
      {/* Header slot */}
      {headerSlot && (
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/5">
          <h2 className="text-white/80 font-semibold text-sm tracking-wide">Transactions</h2>
          <div className="flex items-center gap-2">{headerSlot}</div>
        </div>
      )}

      {/* Sort + filter controls */}
      {showControls && (
        <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 space-y-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-white/30 text-xs tracking-widest uppercase font-semibold">Sort</span>
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

          {filterOpen && (
            <div className="flex items-center gap-2 flex-wrap pt-1 pb-1 border-t border-white/5">
              <span className="text-white/30 text-xs tracking-widest uppercase font-semibold mr-1">Category</span>
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
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.title}
                  </span>
                );
              })}
            </div>
          )}

          <div className="border-t border-white/5 -mx-4 sm:-mx-5" />
        </div>
      )}

      {/* ── Desktop table (sm+) ── */}
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
                const isSelected = selectedTxId === tx._id;

                return (
                  <tr
                    key={tx._id}
                    onClick={() => handleRowClick(tx)}
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
                    <td className="py-4 px-5">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-white/90 leading-tight">{tx.title}</span>
                        {tx.note && (
                          <span className="text-xs text-white/30 truncate max-w-[200px]">{tx.note}</span>
                        )}
                      </div>
                    </td>
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
                    <td className="py-4 px-5">
                      <span className="text-white/50 tabular-nums text-xs">{formatDate(tx.date)}</span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <span className={`font-semibold tabular-nums ${isIncome ? "text-emerald-400" : "text-red-400"}`}>
                        {isIncome ? "+" : "-"}{formatted}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Mobile card list (< sm) ── */}
      <div className="sm:hidden">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="px-4 py-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <div className="flex justify-between mb-2">
                <div className="h-4 w-2/5 rounded animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
                <div className="h-4 w-1/4 rounded animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
              </div>
              <div className="flex justify-between">
                <div className="h-3 w-1/4 rounded animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
                <div className="h-3 w-1/5 rounded animate-pulse" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
              </div>
            </div>
          ))
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
