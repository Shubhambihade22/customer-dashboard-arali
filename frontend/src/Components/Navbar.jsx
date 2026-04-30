import React from "react";
import logo from "../assets/aralilogo.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <img
          src={logo}
          alt="Logo"
          className="navbar-logo"
          onClick={handleLogoClick}
        />
        <h2 className="navbar-title">ARALI AI CUSTOMER MANAGEMENT</h2>
        <div className="navbar-right">
          <Link
            to="https://app.arali.ai/sign-in"
            className="navbar-link"
            target="_blank"
          >
            Login/Signup
          </Link>
          <Link
            to="https://www.arali.ai/#"
            className="navbar-link"
            target="_blank"
          >
            About Us
          </Link>
          <Link
            to="https://www.arali.ai/docs#faq"
            className="navbar-link"
            target="_blank"
          >
            FAQs
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
