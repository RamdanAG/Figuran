import React, { useState, useEffect, useRef } from 'react';
import '../styles/FigureScroll.scss';

const FigureScroll = ({ figures }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');
  const lastScrollTime = useRef(Date.now());
  const scrollCooldown = 800; // Cooldown untuk scroll (biar berasa berat)

  useEffect(() => {
    let scrollTimeout;
    
    const handleWheel = (e) => {
      e.preventDefault();
      
      const now = Date.now();
      if (now - lastScrollTime.current < scrollCooldown || isTransitioning) {
        return;
      }
      
      const direction = e.deltaY > 0 ? 'down' : 'up';
      setScrollDirection(direction);
      
      if (direction === 'down' && currentIndex < figures.length - 1) {
        lastScrollTime.current = now;
        setIsTransitioning(true);
        
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
          setTimeout(() => setIsTransitioning(false), 100);
        }, 50);
      } else if (direction === 'up' && currentIndex > 0) {
        lastScrollTime.current = now;
        setIsTransitioning(true);
        
        setTimeout(() => {
          setCurrentIndex(prev => prev - 1);
          setTimeout(() => setIsTransitioning(false), 100);
        }, 50);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [currentIndex, figures.length, isTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTransitioning) return;
      
      if (e.key === 'ArrowDown' && currentIndex < figures.length - 1) {
        setScrollDirection('down');
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
          setTimeout(() => setIsTransitioning(false), 100);
        }, 50);
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        setScrollDirection('up');
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex(prev => prev - 1);
          setTimeout(() => setIsTransitioning(false), 100);
        }, 50);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, figures.length, isTransitioning]);

  return (
    <div className="figure-scroll">
      {figures.map((figure, index) => {
        const isActive = index === currentIndex;
        const isPrev = index < currentIndex;
        const isNext = index > currentIndex;
        
        return (
          <div
            key={index}
            className={`
              figure-slide 
              ${isActive ? 'active' : ''} 
              ${isPrev ? 'prev' : ''} 
              ${isNext ? 'next' : ''}
              ${isTransitioning && isActive ? 'transitioning' : ''}
            `}
          >
            {/* Background dengan parallax */}
            <div className="figure-slide__background">
              <div 
                className="background-image"
                style={{ 
                  backgroundImage: `url(${figure.image})`,
                }}
              />
              <div className="figure-slide__overlay"></div>
            </div>
            
            {/* Content */}
            <div className="figure-slide__content">
              <div className="figure-slide__info">
                <div className="info-tag">Released products</div>
                <h1 className="info-title">{figure.title}</h1>
                <p className="info-subtitle">{figure.subtitle}</p>
                <button className="info-btn">EXPLORE</button>
              </div>
              
              <div className="figure-slide__details">
                <div className="detail-date">
                  {figure.date}
                  <div className="copyright">©2026</div>
                </div>
                <div className="detail-credits">
                  <div className="credit-item">
                    <span className="credit-label">Sculptor:</span>
                    <span className="credit-name">{figure.sculptor}</span>
                  </div>
                  <div className="credit-item">
                    <span className="credit-label">Painter:</span>
                    <span className="credit-name">{figure.painter}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-progress">
          <div className="progress-text">
            {String(currentIndex + 1).padStart(2, '0')} / {String(figures.length).padStart(2, '0')}
          </div>
          <div className="progress-bars">
            {figures.map((_, index) => (
              <div 
                key={index} 
                className={`progress-bar ${index === currentIndex ? 'active' : ''} ${index < currentIndex ? 'completed' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FigureScroll;