import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here.</h2>
        <p>"Hungry? We've got you covered. Explore our mouth-watering menu and order your next meal in minutes!"</p>
        <a href="#explore-menu" className="header-button">View Menu</a>
      </div>
    </div>
  );
}

export default Header;