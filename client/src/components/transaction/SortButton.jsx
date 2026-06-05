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

export default SortButton