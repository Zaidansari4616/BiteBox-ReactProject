import React from "react";
import "./Footer.css";
import facebook_icon from "../../assets/facebook_icon.png";
import twitter_icon from "../../assets/twitter_icon.png";
import linkedin_icon from "../../assets/linkedin_icon.png";

function Footer() {
  return (
    <>
      <div className="footer" id="footer">
        <div className="footer-content">
          <div className="footer-content-left">
            <i className="bi bi-fork-knife">BiteBox</i>
            <p>At BiteBox, we believe good food brings people together. That’s why every dish we make is prepared with fresh ingredients, rich flavors, and a promise of quality. Thank you for choosing us—your taste matters.</p>
            <div className="footer-social-icons">
                <img src={facebook_icon} alt="" />
                <img src={twitter_icon} alt="" />
                <img src={linkedin_icon} alt="" />
            </div>
          </div>
          <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>Privacy & Policy</li>
                <li>Delivery</li>
                <li>FAQs</li>
            </ul>
          </div>
          <div className="footer-content-right">
            <h2>CONTACT US</h2>
            <ul>
                <li>022-1809-1809</li>
                <li>bitebox@gmail.com</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2025 &copy; BiteBox.com - All Rights Reserved.</p>
      </div>
    </>
  );
}

export default Footer;
