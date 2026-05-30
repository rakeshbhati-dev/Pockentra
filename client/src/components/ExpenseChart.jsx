import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

// ✅ Moved outside component — prevents remount on every render
const CustomTooltip = ({ active, payload, total }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload

    return (
      <div className="bg-[#1e2433] border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 shadow-lg">
        <div
          className="font-medium mb-1"
          style={{ color: data.color }}
        >
          {data.name}
        </div>

        <div className="flex items-center gap-2">
          <span>₹{data.value.toLocaleString()}</span>

          <span className="text-slate-500">
            {Math.round((data.value / total) * 100)}%
          </span>
        </div>
      </div>
    )
  }

  return null
}

function ExpenseChart({ breakdown = [] }) {
  const chartData = breakdown.map((item) => ({
    name: item.title,
    value: item.amount,
    color: item.color,
    percentage: item.percentage,
  }))

  const total = chartData.reduce((sum, item) => sum + item.value, 0)

  // Empty state
  if (!chartData.length) {
    return (
      <div className="bg-[#11141d] rounded-2xl p-5 w-full  flex flex-col">
        <h2 className="text-white text-xl font-semibold mb-1">
          Total Expense
        </h2>

        <p className="text-slate-500 text-sm mb-4">
          Breakdown by category
        </p>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full border-8 border-slate-800 border-dashed mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">💸</span>
            </div>

            <h3 className="text-slate-200 text-lg font-medium mb-1">
              No expenses yet
            </h3>

            <p className="text-slate-500 text-sm max-w-[220px]">
              Your expense breakdown will appear here once you add transactions.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#11141d] rounded-2xl p-5 w-full min-h-[0px]">
      <h2 className="text-white text-xl font-semibold mb-1">
        Total Expense
      </h2>

      <p className="text-slate-500 text-sm ">
        Breakdown by category
      </p>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 h-full">
        {/* Chart */}
        <div className="relative w-[280px] h-[280px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={75}
                strokeWidth={2}
                stroke="#11141d"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.color}
                  />
                ))}
              </Pie>

              {/* ✅ Pass total via wrapper to avoid defining inside render */}
              <Tooltip content={(props) => <CustomTooltip {...props} total={total} />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-white">
              ₹{total.toLocaleString()}
            </span>

            <span className="text-sm text-slate-500 mt-1">
              Total
            </span>
          </div>
        </div>

        {/* Custom Legend */}
        <div className="flex flex-col gap-4 w-full max-w-[320px]">
          {chartData.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3"
            >
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />

              <span className="text-sm text-slate-400 flex-1">
                {item.name}
              </span>

              <span className="text-sm font-semibold text-white">
                ₹{item.value.toLocaleString()}
              </span>

              <span className="text-xs text-slate-500">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExpenseChart
