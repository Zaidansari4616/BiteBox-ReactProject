import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.png";
import basket_icon from "../../assets/basket_icon.png";
import { Link } from "react-router";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const { getTotalCart } = useContext(StoreContext);

  return (
    <>
      <div className="navbar">
        <Link to="/">
          <i className="bi bi-fork-knife">BiteBox</i>
        </Link>
        <ul className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("home")}
          >
            Home
          </Link>
          <a
            href="#about"
            onClick={() => setMenu("about")}
          >
            About
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact")}
          >
            Contact
          </a>
          <a
            href="#explore-menu"
            onClick={() => setMenu("menu")}
          >
            Menu
          </a>
        </ul>
        <div className="navbar-right">
          <img src={search_icon} alt="search icon" />
          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={basket_icon} alt="" />
            </Link>
            <div className={getTotalCart() === 0 ? "" : "dot"}></div>
          </div>
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        </div>
      </div>
    </>
  );
};
export default Navbar;
