import React from 'react';
import './Loader.css';

const Loader = ({ message = "Loading delicious food..." }) => {
  return (
    <div className="loader-container">
      <div className="loader-wrapper">
        <div className="loader-spinner">
          <div className="loader-circle"></div>
          <div className="loader-circle"></div>
          <div className="loader-circle"></div>
        </div>
        <p className="loader-message">{message}</p>
        <div className="loader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;