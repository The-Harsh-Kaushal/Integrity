import React from "react";

const Header = () => {
  return (
    <header className="w-full px-6 py-4 bg-[var(--surface-1)] text-[var(--text)] shadow-md">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🛡️</span>
        <span className="text-xl font-bold text-[var(--primary)]">HIVE</span>
        <span className="text-sm text-[var(--accent)] hidden sm:inline">
          : Hash Integrity Verification Engine
        </span>
      </div>
    </header>
  );
};

export default Header;
