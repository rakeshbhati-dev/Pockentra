import { useState } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import SortButton from "./SortButton";
import CategoryPill from "./CategoryPill";

export default function TransactionFilterBar({
  categories = [],
  sort,
  onSort,
  onFilterChange,
}) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

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
    <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 space-y-3">
      {/* Sort + filter toggle row */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-white/30 text-xs tracking-widest uppercase font-semibold">Sort</span>
          <SortButton label="Amount" field="amount" currentSort={sort} onSort={onSort} />
          <SortButton label="Date" field="date" currentSort={sort} onSort={onSort} />
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

      {/* Category pills (expanded) */}
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

      {/* Active filter chips (collapsed) */}
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
  );
}
