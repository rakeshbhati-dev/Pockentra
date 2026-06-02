import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Pencil } from "lucide-react";
import logo from "../assets/logo.png";
import { useUser } from "../contexts/UserContextProvider";
import EditProfileModal from "./EditProfileModal";
import { updateProfile } from "../services/user.service";

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
      {/* User info */}
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

      {/* Actions */}
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

function Header({ showButton = true }) {
  const navigate = useNavigate();
  const { user,token,setUser,setToken } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const profileRef = useRef(null);

  // Close when clicking outside the entire profile area (avatar + dropdown)
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setDropdownOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleEditProfile = () => setEditModalOpen(true);

  const handleSaveProfile = async (data) => {
    try {
      setIsSaving(true);
     const response= await updateProfile(token, data); 
      setUser(response.data)
      setEditModalOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login')
  };

  return (
    <>
      <div className="flex px-4 py-3 justify-between items-center bg-[#1f242d]">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-48" />
        </Link>

        <div className="flex gap-4 items-center">
          {showButton && (
            <button
              className="bg-primary p-2 rounded-md font-semibold cursor-pointer text-white"
              onClick={() => navigate("/transaction/add")}
            >
              + Add Transaction
            </button>
          )}

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              aria-label="Open profile menu"
              aria-expanded={dropdownOpen}
              className={`w-10 h-10 rounded-full bg-primary flex items-center justify-center font-semibold text-white text-xl cursor-pointer transition-all duration-150 ${
                dropdownOpen ? "ring-2 ring-primary/50" : ""
              }`}
            >
              {user?.firstName?.[0].toUpperCase()}
            </button>

            {dropdownOpen && (
              <ProfileDropdown
                user={user}
                onClose={() => setDropdownOpen(false)}
                onEditProfile={handleEditProfile}
                onLogout={handleLogout}
              />
            )}
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={editModalOpen}
        user={user}
        isSaving={isSaving}
        onSave={handleSaveProfile}
        onClose={() => setEditModalOpen(false)}
      />
    </>
  );
}

export default Header;
