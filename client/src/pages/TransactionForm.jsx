import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useUser } from "../contexts/UserContextProvider";
import { getAllCategories } from "../services/category.service";
import Input from "../components/Input";
import { ChevronDown } from "lucide-react";
import { addTransaction, getTransactionById, updateTransaction } from "../services/transaction.service";
import { useNavigate, useParams } from "react-router-dom";

const labelClass = "block text-primary text-xs uppercase tracking-wide mb-1";

const selectWrapClass = "flex-1";
const selectClass =
    "w-full appearance-none bg-slate-700 text-white text-sm rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer placeholder-gray-500";

function TransactionForm() {
    const { user, token, loading } = useUser();
    const [categories, setCategories] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams(); // present = update mode, absent = add mode

    const isEditMode = Boolean(id);

    const today = new Date().toISOString().split("T")[0];

    const [form, setForm] = useState({
        title: "",
        categoryId: "",
        note: "",
        amount: "",
        date: today,
        type: "expense",
    });

    const [errors, setErrors] = useState({});

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories(token);
                setCategories(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        if (token) fetchCategories();
    }, [token]);

    // If edit mode, fetch existing transaction and pre-fill form
    useEffect(() => {
        if (!isEditMode || !token) return;

        const fetchTransaction = async () => {
            try {
                setIsFetching(true);
                const response = await getTransactionById(token, id);
                const t = response.data;

                setForm({
                    title: t.title || "",
                    categoryId: t.categoryId?._id ?? t.categoryId ?? "",
                    note: t.note || "",
                    amount: String(t.amount ?? ""),
                    date: t.date ? t.date.split("T")[0] : today,
                    type: t.type || "expense",
                });
            } catch (err) {
                console.log(err);
            } finally {
                setIsFetching(false);
            }
        };

        fetchTransaction();
    }, [id, token, isEditMode]);

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = "Title is required";
        if (!form.categoryId) e.categoryId = "Please select a category";
        if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
            e.amount = "Enter a valid amount";
        if (!form.date) e.date = "Date is required";
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            setIsSubmitting(true);
            const payload = { ...form, amount: Number(form.amount) };

            if (isEditMode) {
                await updateTransaction(token, id, payload);
            } else {
                await addTransaction(token, payload);
            }

            navigate("/transaction");
        } catch (err) {
            console.log(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading || isFetching) return <p className="text-white/50 p-8">Loading...</p>;

    return (
        <>
            <Header showButton={false} />

            <div className="px-4 py-8 md:px-8">
                {/* Page heading */}
                <h1 className="text-white font-semibold text-xl mb-6">
                    {isEditMode ? "Update Transaction" : "Add Transaction"}
                </h1>

                {/* Form card — full width */}
                <div
                    className="rounded-2xl p-6 md:p-8"
                    style={{
                        backgroundColor: "#11141d",
                        border: "1px solid rgba(255,255,255,0.07)",
                    }}
                >
                    {/* Type toggle — full width on its own row */}
                    <div className="mb-6">
                        <label className={labelClass}>Type</label>
                        <div className="flex rounded-lg overflow-hidden border border-white/10 w-full md:w-64">
                            {["expense", "income"].map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setForm((prev) => ({ ...prev, type: t }))}
                                    className={`flex-1 py-2 text-sm font-medium capitalize transition-all duration-200 ${
                                        form.type === t
                                            ? t === "expense"
                                                ? "bg-red-500/20 text-red-400"
                                                : "bg-emerald-500/20 text-emerald-400"
                                            : "text-white/30 hover:text-white/60 hover:bg-white/5"
                                    }`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-5">
                        {/* Row 1 — Title | Amount */}
                        <div className="flex flex-col md:flex-row gap-5">
                            <Input
                                label="Title"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="e.g. Netflix subscription"
                                errorMessage={errors.title}
                            />
                            <Input
                                label="Amount (₹)"
                                name="amount"
                                type="number"
                                value={form.amount}
                                onChange={handleChange}
                                placeholder="0"
                                errorMessage={errors.amount}
                            />
                        </div>

                        {/* Row 2 — Category | Date */}
                        <div className="flex flex-col md:flex-row gap-5">
                            {/* Category select — matches Input styling */}
                            <div className={selectWrapClass}>
                                <label className={labelClass}>Category</label>
                                <div className="relative">
                                    <select
                                        name="categoryId"
                                        value={form.categoryId}
                                        onChange={handleChange}
                                        className={selectClass}
                                    >
                                        <option value="" disabled>
                                            Select a category
                                        </option>
                                        {categories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.title}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
                                        size={14}
                                    />
                                </div>
                                {errors.categoryId && (
                                    <p className="text-red-500 text-xs pl-1 mt-1">
                                        {errors.categoryId}
                                    </p>
                                )}
                            </div>

                            <Input
                                label="Date"
                                name="date"
                                type="date"
                                value={form.date}
                                onChange={handleChange}
                                inputStyle="[color-scheme:dark] cursor-pointer"
                                max={today}
                                errorMessage={errors.date}
                            />
                        </div>

                        {/* Row 3 — Note full width */}
                        <div className="flex-1">
                            <label className={labelClass}>
                                Note{" "}
                                <span className="normal-case tracking-normal text-white/20 font-normal text-xs">
                                    (optional)
                                </span>
                            </label>
                            <textarea
                                name="note"
                                value={form.note}
                                onChange={handleChange}
                                placeholder="Add a note..."
                                rows={3}
                                className="w-full bg-slate-700 text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary placeholder-gray-500 resize-none"
                            />
                        </div>

                        {/* Submit */}
                        <div className="flex justify-end pt-1">
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="px-8 py-2.5 rounded-lg text-sm font-semibold text-white bg-primary hover:opacity-90 active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting
                                    ? isEditMode ? "Updating..." : "Adding..."
                                    : isEditMode ? "Update Transaction" : "Add Transaction"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TransactionForm;
