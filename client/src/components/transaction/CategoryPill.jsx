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

export default CategoryPill