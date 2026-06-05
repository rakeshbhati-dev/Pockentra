import { useEffect, useState } from "react";
import {
    ArrowLeft, Trash2, Pencil, X, AlertTriangle,
    CreditCard, Film, ShoppingCart, Coffee, Home, Car,
    Zap, Heart, Music, Book, Briefcase, Globe, Gift,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTransaction, getTransactionById } from "../services/transaction.service";
import { useUser } from "../contexts/UserContextProvider";
import DeleteTransactionModal from "../components/transaction/DeleteTransactionModal";

const ICON_MAP = {
    Film, ShoppingCart, Coffee, Home, Car, Zap,
    Heart, Music, Book, Briefcase, Globe, Gift, CreditCard,
};

function CategoryIcon({ iconName, color, size = 15 }) {
    const Icon = ICON_MAP[iconName] || CreditCard;
    return <Icon size={size} color={color} />;
}

const MOCK_TRANSACTION = {
    _id: "txn_001",
    title: "Netflix Subscription",
    type: "expense",
    amount: 649,
    categoryId: { _id: "cat_01", title: "Entertainment", icon: "Film", color: "#a78bfa" },
    date: "2025-05-28T14:35:00",
    note: "Monthly premium plan auto-renewed. Consider switching to basic if budget is tight.",
};

const fmt = (n) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const fmtDate = (iso) =>
    new Date(iso).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

const fmtTime = (iso) =>
    new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

function DetailRow({ label, value }) {
    return (
        <div className="flex items-start justify-between gap-4">
            <span className="text-white/30 text-xs uppercase tracking-widest font-semibold shrink-0 mt-0.5">
                {label}
            </span>
            <span className="text-white/80 text-sm text-right leading-relaxed">{value}</span>
        </div>
    );
}

function DeleteModal({ title, onConfirm, onCancel, isDeleting }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
            <div
                className="relative w-full max-w-sm rounded-2xl p-6 shadow-2xl"
                style={{ backgroundColor: "#11141d", border: "1px solid rgba(255,255,255,0.08)" }}
            >
                <button onClick={onCancel} className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors">
                    <X size={18} />
                </button>
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                    <AlertTriangle size={22} className="text-red-400" />
                </div>
                <h2 className="text-white font-semibold text-base mb-1">Delete Transaction?</h2>
                <p className="text-white/40 text-sm mb-6 leading-relaxed">
                    <span className="text-white/70">"{title}"</span> will be permanently removed. This action cannot be undone.
                </p>
                <div className="flex gap-3">
                    <button onClick={onCancel} className="flex-1 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white bg-white/5 hover:bg-white/10 transition-all">
                        Cancel
                    </button>
                    <button onClick={onConfirm} disabled={isDeleting} className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-500/80 hover:bg-red-500 transition-all disabled:opacity-50">
                        {isDeleting ? "Deleting…" : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}

function TransactionDetail() {
    const [transaction,setTransaction]=useState()
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const {id}=useParams()
    const {user,token}=useUser()
    const navigate=useNavigate()


    const fetchTransaction=async () => {
        try {
            const response=await getTransactionById(token,id)
            setTransaction(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const isIncome = transaction?.type === "income";

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteTransaction(token,id)
            navigate('/transaction');
        } catch (err) {
            console.error(err);
        } finally {
            setIsDeleting(false);
            setShowDeleteModal(false);
        }
    };

    useEffect(()=>{
        fetchTransaction()
    },[])
    

    return (
        <>
            {/* Full-screen flex column — header + scrollable body + pinned footer */}
            <div className="h-screen flex flex-col" style={{ backgroundColor: "#0d1018" }}>

                {/* Header */}
                <div
                    className="flex items-center justify-between px-5 py-4 flex-shrink-0"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                    <button
                        onClick={() => window.history.back()}
                        className="p-1.5 rounded-lg text-white/30 hover:text-white/80 hover:bg-white/5 transition-all"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <span className="text-white/50 text-xs tracking-widest uppercase font-semibold">
                        Transaction detail
                    </span>
                    <div className="w-8" />
                </div>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
                    {/* Amount hero */}
                    <div className="text-center py-4">
                        <p className="text-white/30 text-xs mb-2 tracking-wide uppercase">
                            {isIncome ? "Income" : "Expense"}
                        </p>
                        <p className={`text-4xl font-bold tabular-nums ${isIncome ? "text-emerald-400" : "text-red-400"}`}>
                            {isIncome ? "+" : "−"}{fmt(transaction?.amount)}
                        </p>
                    </div>

                    {/* Category badge */}
                    <div className="flex justify-center">
                        <span
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
                            style={{
                                backgroundColor: `${transaction?.categoryId.color}18`,
                                color:transaction?.categoryId.color,
                                border: `1px solid ${transaction?.categoryId.color}30`,
                            }}
                        >
                            <CategoryIcon iconName={transaction?.categoryId.color} color={transaction?.categoryId.color} />
                            {transaction?.categoryId.title}
                        </span>
                    </div>

                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }} />

                    {/* Detail rows */}
                    <div className="space-y-4">
                        <DetailRow label="Title" value={transaction?.title} />
                        <DetailRow label="Date" value={fmtDate(transaction?.date)} />
                        <DetailRow label="Time" value={fmtTime(transaction?.date)} />
                        {transaction?.note && <DetailRow label="Note" value={transaction?.note} />}
                        <DetailRow
                            label="Type"
                            value={
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    isIncome
                                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                                        : "bg-red-500/15 text-red-400 border border-red-500/20"
                                }`}>
                                    {isIncome ? "Income" : "Expense"}
                                </span>
                            }
                        />
                    </div>
                </div>

                {/* Pinned footer */}
                <div
                    className="px-5 py-4 flex gap-3 flex-shrink-0"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-red-400 border border-red-500/20 bg-red-500/8 hover:bg-red-500/15 transition-all duration-150"
                    >
                        <Trash2 size={14} />
                        Delete
                    </button>
                    <button
                        onClick={() => navigate(`/transaction/update/${id}`)}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-indigo-300 border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 transition-all duration-150"
                    >
                        <Pencil size={14} />
                        Edit
                    </button>
                </div>
            </div>

            {showDeleteModal && (
                // <DeleteModal
                //     title={transaction.title}
                //     onConfirm={handleDelete}
                //     onCancel={() => setShowDeleteModal(false)}
                //     isDeleting={isDeleting}
                // />
                <DeleteTransactionModal
                        transaction={transaction}
                        isDeleting={isDeleting}
                        onConfirm={handleDelete}
                        onClose={()=>setShowDeleteModal(false)}
                      />
            )}
        </>
    );
}

export default TransactionDetail;
