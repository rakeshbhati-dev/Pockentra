function ProfileDropdown({ user, onClose, onEditProfile, onLogout }) {
  const ref = useRef(null);

  const initials = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .map((n) => n[0].toUpperCase())
    .join("");

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  return (
    <div
      ref={ref}
      className="absolute right-0 top-[calc(100%+10px)] w-56 rounded-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150"
      style={{
        backgroundColor: "#1a1f2c",
        border: "1px solid rgba(255,255,255,0.09)",
        transformOrigin: "top right",
      }}
      role="menu"
    >
      <div
        className="flex items-center gap-3 px-4 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center font-bold text-white text-lg flex-shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-white/90 text-sm font-semibold truncate">{fullName || "User"}</p>
          <p className="text-white/35 text-xs truncate mt-0.5">{user?.email}</p>
        </div>
      </div>

      <div className="p-2">
        <button
          role="menuitem"
          onClick={() => { onClose(); onEditProfile?.(); }}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white/90 hover:bg-white/[0.06] transition-all duration-150 text-left"
        >
          <Pencil size={15} className="opacity-70 flex-shrink-0" />
          Edit profile
        </button>

        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.06)", margin: "4px 0" }} />

        <button
          role="menuitem"
          onClick={() => { onClose(); onLogout?.(); }}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150 text-left"
        >
          <LogOut size={15} className="opacity-70 flex-shrink-0" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileDropdown