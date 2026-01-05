import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCart } = useContext(StoreContext);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="navbar">
      <Link to="/" onClick={() => setMenu("home")}>
        <i className="bi bi-box-seam">BiteBox</i>
      </Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>
          Home
        </Link>
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            setMenu("about");
            scrollToSection("about");
          }}
          className={menu === "about" ? "active" : ""}
        >
          About
        </a>
        <a
          href="#footer"
          onClick={(e) => {
            e.preventDefault();
            setMenu("contact");
            scrollToSection("footer");
          }}
          className={menu === "contact" ? "active" : ""}
        >
          Contact
        </a>
        <a
          href="#explore-menu"
          onClick={(e) => {
            e.preventDefault();
            setMenu("menu");
            scrollToSection("explore-menu");
          }}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/cart">
            <i className="bi bi-cart3"></i>
          </Link>
          <div className={getTotalCart() === 0 ? "" : "dot"}></div>
        </div>
        <button onClick={() => setShowLogin(true)}>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
