export function formatDate(iso) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  }).format(new Date(iso));
}

export function formatAmount(amount, type) {
  const formatted = new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0,
  }).format(amount);
  return { formatted, isIncome: type === "income" };
}

export function formatTime(iso) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit", minute: "2-digit", hour12: true,
  }).format(new Date(iso));
}
