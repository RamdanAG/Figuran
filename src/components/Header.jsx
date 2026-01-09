import React from 'react';
import '../styles/Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <div className="logo-icon">
          <span>M</span>
        </div>
        <span className="logo-text">MIMEYOI</span>
      </div>
      
      <nav className="header__nav">
        <a href="#top" className="nav-link">Top</a>
        <a href="#scale-figures" className="nav-link">Scale Figures</a>
        <a href="#about" className="nav-link">About mimeyoi</a>
        <a href="#news" className="nav-link">News</a>
        <a href="#contact" className="nav-link">Contact</a>
      </nav>
      
      <div className="header__lang">
        <button className="lang-btn active">JA</button>
      </div>
    </header>
  );
};

export default Header;