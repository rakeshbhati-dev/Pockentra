export default function TransactionSkeleton({ variant = "desktop", count = 5 }) {
  if (variant === "mobile") {
    return Array.from({ length: count }).map((_, i) => (
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
    ));
  }

  return Array.from({ length: count }).map((_, i) => (
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
  ));
}
