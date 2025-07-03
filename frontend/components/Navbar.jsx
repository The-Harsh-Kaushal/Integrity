import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axiosreq";

const Navbar = ({ dsbLogout = false, loaderSetfn }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  const onLogout = async () => {
    try {
      loaderSetfn(true);
      const response = await api.post("/auth/logout");

      sessionStorage.removeItem("accessToken");
      loaderSetfn(false);

      navigate("/authentication");
    } catch (err) {
      console.log(err.message);
    }
  };
  const onLogoutAll = async () => {
    try {
      loaderSetfn(true);
      const response = await api.post("/auth/logoutall");
      sessionStorage.removeItem("accessToken");
      loaderSetfn(false);
      navigate("/authentication");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <nav className="bg-[var(--surface-1)] w-full fixed text-[var(--text)] px-4 py-3 shadow-md z-50 animate-fade-in">
      <div className="flex justify-between items-center">
        {/* Logo & Brand */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-xl">🛡️</span>
          <span className="text-lg font-bold text-[var(--primary)]">HIVE</span>
          <span className="text-sm text-[var(--accent)] hidden sm:inline">
            : Hash Integrity Verification Engine
          </span>
        </div>

        {/* Right-side nav */}
        <div className="flex items-center gap-6 text-sm relative">
          <button
            className="hover:text-[var(--primary)] transition"
            onClick={() => navigate("/about")}
          >
            About
          </button>

          <div ref={dropdownRef} className="relative">
            {!dsbLogout && (
              <button
                className="hover:text-[var(--primary)] transition"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                Logout
              </button>
            )}

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-[var(--surface-0)] border border-[var(--primary)] rounded-lg shadow-lg text-sm z-50">
                <button
                  onClick={onLogout}
                  className="w-full rounded-t-lg text-left px-4 py-2 hover:bg-[var(--surface-1)]"
                >
                  Logout
                </button>
                <button
                  onClick={onLogoutAll}
                  className="w-full rounded-b-lg text-left px-4 py-2 hover:bg-[var(--surface-1)]"
                >
                  Logout All
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
