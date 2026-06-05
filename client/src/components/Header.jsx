import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Pencil, Plus } from "lucide-react";
import logo from "../assets/logo.png";
import { useUser } from "../contexts/UserContextProvider";
import EditProfileModal from "./EditProfileModal";
import { updateProfile } from "../services/user.service";
import ProfileDropdown from "./header/ProfileDropdown";
import Button from "./Button";
import FabButton from "./FabButton";



function Header({ showButton = true }) {
  const navigate = useNavigate();
  const { user, token, setUser, setToken } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setDropdownOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleEditProfile = () => setEditModalOpen(true);

  const handleSaveProfile = async (data) => {
    try {
      setIsSaving(true);
      const response = await updateProfile(token, data);
      setUser(response.data);
      setEditModalOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      {/* Header bar */}
      <div className="flex px-4 py-3 justify-between items-center bg-[#1f242d]">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-36 sm:w-48" />
        </Link>

        <div className="flex gap-4 items-center">
          {/* Add Transaction button — desktop only */}
          {showButton && (
            <Button
            title='+ Add Transaction'
            buttonStyle='hidden sm:block py-2'
            onClick={()=>navigate('/transaction/add')}
            />
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
              {user?.firstName?.[0]?.toUpperCase()}
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

      {/* FAB — mobile only */}
      {showButton && (
        <FabButton
        onClick={()=>navigate('/transaction/add')}
        ariaLabel='Add Transaction'
        />
      )}

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
