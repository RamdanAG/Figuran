import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.scss';
import { figuresData } from '../data/figures';

const Header = ({ isVisible = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('ID');
  const [currentFigureIndex, setCurrentFigureIndex] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isLangOpen) setIsLangOpen(false);
  };

  const toggleLang = () => {
    setIsLangOpen(!isLanOpen);
  }; 

  const handleLangChange = (lang) => {
    setCurrentLang(lang);
    setIsLangOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Auto-rotate figures in menu every 3 seconds
  useEffect(() => {
    if (!isMenuOpen) return;

    const interval = setInterval(() => {
      setCurrentFigureIndex((prev) => (prev + 1) % figuresData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isMenuOpen]);

  return (
    <>
      <header className={`header ${isVisible ? 'visible' : 'hidden'} ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="header__container">
          {/* Logo */}
          <Link to="/" className="header__logo" onClick={closeMenu}>
            <div className="logo-icon">
              <span>M</span>
            </div>
            <span className="logo-text">MIMEYOI</span>
          </Link>

          {/* Right Side: Language & Hamburger */}
          <div className="header__right">
            {/* Language Dropdown */}
            <div className="header__lang">
              <button 
                className={`lang-btn ${isLangOpen ? 'active' : ''}`}
                onClick={toggleLang}
              >
                {currentLang}
                <svg 
                  className="lang-arrow" 
                  width="12" 
                  height="8" 
                  viewBox="0 0 12 8"
                  fill="none"
                >
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </button>

              {isLangOpen && (
                <div className="lang-dropdown">
                  <button 
                    className={`lang-option ${currentLang === 'JA' ? 'active' : ''}`}
                    onClick={() => handleLangChange('JA')}
                  >
                    日本語 (JA)
                  </button>
                  <button 
                    className={`lang-option ${currentLang === 'EN' ? 'active' : ''}`}
                    onClick={() => handleLangChange('EN')}
                  >
                    English (EN)
                  </button>
                  <button 
                    className={`lang-option ${currentLang === 'ID' ? 'active' : ''}`}
                    onClick={() => handleLangChange('ID')}
                  >
                    Indonesia (ID)
                  </button>
                </div>
              )}
            </div>

            {/* Hamburger Button */}
            <button 
              className={`header__hamburger ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu */}
      <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}>
        {/* Left Side: Figure Display Area - Like Reference */}
        <div className="menu-left">
          {/* Optional: Add background text like in reference */}
          <div className="menu-left__bg-text">
            {figuresData[currentFigureIndex].title.toLowerCase().replace(/\s/g, '')}
          </div>

          {/* Progress Indicator - Bottom Left */}
          <div className="menu-progress">
            <div className="progress-number">
              {String(currentFigureIndex + 1).padStart(2, '0')} / {String(figuresData.length).padStart(2, '0')}
            </div>
            <div className="progress-bars">
              {figuresData.map((_, index) => (
                <div 
                  key={index} 
                  className={`progress-bar ${index === currentFigureIndex ? 'active' : ''} ${index < currentFigureIndex ? 'completed' : ''}`}
                  onClick={() => setCurrentFigureIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Menu Navigation - Like Reference */}
        <div className="menu-right">
          <nav className="menu-nav">
            <Link to="/" className="menu-link" onClick={closeMenu}>
              <span className="menu-link__text">TOP</span>
            </Link>
            
            <Link to="/figures" className="menu-link" onClick={closeMenu}>
              <span className="menu-link__text">SCALE FIGURES</span>
              <span className="menu-link__count">(20)</span>
            </Link>
            
            <Link to="/about" className="menu-link" onClick={closeMenu}>
              <span className="menu-link__text">ABOUT MIMEYOI</span>
            </Link>
            
            <Link to="/news" className="menu-link" onClick={closeMenu}>
              <span className="menu-link__text">NEWS</span>
              <span className="menu-link__count">(12.3.2025)</span>
            </Link>
            
            <Link to="/contact" className="menu-link" onClick={closeMenu}>
              <span className="menu-link__text">CONTACT</span>
            </Link>
          </nav>

          {/* Footer Info - Bottom Right */}
          <div className="menu-footer">
            <div className="menu-footer__date">
              <span>Jan</span>
              <span>©2026</span>
            </div>
            
            <div className="menu-footer__links">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                X (Twitter)
              </a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;