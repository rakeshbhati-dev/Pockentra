import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Input from "./Input";

/**
 * EditProfileModal
 *
 * Props:
 *   isOpen      – bool
 *   user        – { firstName, lastName, email }
 *   isSaving    – bool; shows spinner on Save button
 *   onSave      – (data: { firstName, lastName, email }) => void
 *   onClose     – () => void
 */
export default function EditProfileModal({ isOpen, user, isSaving = false, onSave, onClose }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const overlayRef = useRef(null);
  const firstInputRef = useRef(null);

  // Sync fields when modal opens with fresh user data
  useEffect(() => {
    if (isOpen) {
      setFirstName(user?.firstName ?? "");
      setLastName(user?.lastName ?? "");
      setEmail(user?.email ?? "");
      // Auto-focus first field after mount
      setTimeout(() => firstInputRef.current?.focus(), 50);
    }
  }, [isOpen, user]);

  // Escape to close
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose?.();
  };

  const handleSave = () => {
    onSave?.({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim() });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onMouseDown={handleOverlayClick}
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
        <div className="flex items-center justify-between px-6 pt-6 pb-0">
          <h2 className="text-white/90 text-sm font-semibold">Edit profile</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/30 hover:text-white/80 hover:bg-white/[0.07] transition-all duration-150"
            aria-label="Close"
          >
            <X size={15} />
          </button>
        </div>

        {/* Fields */}
        <div className="px-6 py-5 flex flex-col gap-4">
            <Input
              ref={firstInputRef}
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isSaving}
              placeholder="Enter first name"
              label='First Name'
            />

            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isSaving}
              placeholder="Enter last name"
              label="Last name"
            />

            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSaving}
              placeholder="Enter email"
              label='Email'
            />
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-2.5">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 disabled:opacity-40"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.5)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.09)";
              e.currentTarget.style.color = "rgba(255,255,255,0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving || !firstName.trim() || !email.trim()}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed bg-primary cursor-pointer"
          >
            {isSaving ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/25 border-t-white rounded-full animate-spin" />
                Saving…
              </>
            ) : (
              "Save changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const inputClass = [
  "w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all duration-150",
  "text-white/85 placeholder:text-white/25",
  "disabled:opacity-40 disabled:cursor-not-allowed",
  "focus:ring-1 focus:ring-[#6c63ff]/50",
].join(" ");

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-xs font-semibold tracking-widest uppercase"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        {label}
      </label>
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "10px",
        }}
        className="focus-within:ring-1 focus-within:ring-[#6c63ff]/50 focus-within:border-[#6c63ff]/40 transition-all duration-150"
      >
        {/* Strip the border/bg from the input itself so the wrapper handles it */}
        <div className="[&>input]:bg-transparent [&>input]:border-0 [&>input]:w-full [&>input]:px-3 [&>input]:py-2.5 [&>input]:rounded-xl [&>input]:text-sm [&>input]:outline-none [&>input]:text-white/85 [&>input]:placeholder:text-white/25 [&>input]:disabled:opacity-40">
          {children}
        </div>
      </div>
    </div>
  );
}
