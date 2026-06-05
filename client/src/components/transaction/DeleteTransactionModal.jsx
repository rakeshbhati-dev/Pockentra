import { useEffect, useRef } from "react";
import { Trash2, X } from "lucide-react";
import { formatAmount, formatDate } from "../../utils/formatters";


/**
 * DeleteTransactionModal
 *
 * Props:
 *   transaction  – the transaction to delete (null = closed)
 *   isDeleting   – bool; shows loading state on the confirm button
 *   onConfirm    – (transaction) => void
 *   onClose      – () => void
 */
export default function DeleteTransactionModal({
  transaction,
  isDeleting = false,
  onConfirm,
  onClose,
}) {
  const isOpen = !!transaction;
  const overlayRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Click outside backdrop to close
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose?.();
  };

  if (!isOpen) return null;

  const isExpense = transaction.type === "expense";

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
    >
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "#12151f",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Header */}
        <div className="px-7 pt-7 pb-0">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
            style={{
              backgroundColor: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.22)",
            }}
          >
            <Trash2 size={20} color="#f87171" />
          </div>

          <p className="text-white/90 font-semibold text-base mb-2">Delete transaction?</p>
          <p className="text-white/40 text-sm leading-relaxed">
            This action cannot be undone. The transaction will be permanently removed from your records.
          </p>

          {/* Transaction preview card */}
          <div
            className="mt-5 flex items-center justify-between rounded-xl px-4 py-3.5"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-white/82 text-sm font-medium">{transaction.title}</span>
              <span className="text-white/30 text-xs">
                {transaction.categoryId?.title ?? "Uncategorized"}
                &nbsp;·&nbsp;
                {formatDate(transaction.date)}
              </span>
            </div>
            <span
              className={`text-sm font-bold tabular-nums ${
                isExpense ? "text-red-400" : "text-emerald-400"
              }`}
            >
              {isExpense ? "−" : "+"}{formatAmount(transaction.amount)}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          className="mt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        />

        {/* Footer */}
        <div className="px-7 py-5 flex gap-2.5">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 disabled:opacity-40"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.55)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm?.(transaction)}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-150 disabled:opacity-60"
            style={{
              backgroundColor: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#f87171",
            }}
            onMouseEnter={(e) => { if (!isDeleting) e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.24)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.15)"; }}
          >
            {isDeleting ? (
              <>
                <span
                  className="w-3.5 h-3.5 rounded-full border-2 border-red-400/30 border-t-red-400 animate-spin"
                />
                Deleting…
              </>
            ) : (
              <>
                <Trash2 size={13} />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
