import React from "react";
import "./CSS/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo-icon">🛡️</span>
        <span className="logo-text">HIVE : hash integrity verification engine</span>
      </div>
    </nav>
  );
};

export default Navbar;
