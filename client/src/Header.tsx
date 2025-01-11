import React from "react";
import "./Header.css"; // For styling the header
import logo from "./assets/logo.png"; // Import the logo from assets

const Header: React.FC = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="logo" />
    </header>
  );
};

export default Header;
