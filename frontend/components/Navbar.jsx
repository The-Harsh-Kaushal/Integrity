import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[var(--bg)] text-[var(--text)] px-4 py-3 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl">🛡️</span>
          <span className="text-lg font-bold text-[var(--primary)]">HIVE</span>
          <span className="text-sm text-[var(--accent)] hidden sm:inline">
            : Hash Integrity Verification Engine
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <button className="hover:text-[var(--primary)] transition">
            About
          </button>
          <button className="hover:text-[var(--primary)] transition">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
